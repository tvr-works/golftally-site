import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type Plugin } from "vite";
import { renderMetadata, renderPage } from "./src/render-page.tsx";
import { siteOrigin, sitePages, type Page } from "./src/site.ts";

const entries = Object.fromEntries(
  Object.entries(sitePages).map(([page, { file }]) => [page, file]),
);

const production = process.env.SITE_DEPLOYMENT_MODE === "production";

function staticPages(): Plugin {
  return {
    name: "golftally-static-pages",
    transformIndexHtml(html, { filename }) {
      const page = (Object.keys(entries) as Page[]).find((key) =>
        filename.endsWith("/" + entries[key]),
      );
      if (!page) return html;

      return html
        .replace("<!--page-metadata-->", () => renderMetadata(page))
        .replace("<!--page-content-->", () => renderPage(page));
    },
    generateBundle() {
      const identity = {
        commit:
          process.env.CF_PAGES_COMMIT_SHA ?? process.env.GITHUB_SHA ?? null,
        branch:
          process.env.CF_PAGES_BRANCH ?? process.env.GITHUB_REF_NAME ?? null,
        mode: production ? "production" : "preview",
      };
      this.emitFile({
        type: "asset",
        fileName: "_headers",
        source:
          "/*\n  ! X-Robots-Tag\n\n/build-info.json\n  Cache-Control: no-store\n",
      });
      this.emitFile({
        type: "asset",
        fileName: "build-info.json",
        source: JSON.stringify(identity) + "\n",
      });
      const sitemapUrl = siteOrigin + "/sitemap.xml";
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source:
          "User-agent: *\nAllow: /\n" +
          (production ? "Sitemap: " + sitemapUrl + "\n" : ""),
      });
      if (production) {
        const urls = Object.values(sitePages).flatMap(({ path }) =>
          path === null
            ? []
            : ["  <url><loc>" + siteOrigin + path + "</loc></url>"],
        );
        this.emitFile({
          type: "asset",
          fileName: "sitemap.xml",
          source: [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
            ...urls,
            "</urlset>",
            "",
          ].join("\n"),
        });
      }
    },
  };
}

export default defineConfig({
  appType: "mpa",
  plugins: [tailwindcss(), staticPages()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  build: {
    rollupOptions: { input: entries },
  },
});
