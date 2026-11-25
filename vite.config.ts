import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type Plugin } from "vite";
import type { Page } from "./src/components/site-layout.tsx";
import { renderPage } from "./src/render-page.tsx";

const entries = {
  home: "index.html",
  privacy: "privacy.html",
  support: "support.html",
} satisfies Record<Page, string>;

const production = process.env.SITE_DEPLOYMENT_MODE === "production";

function staticPages(): Plugin {
  return {
    name: "golftally-static-pages",
    transformIndexHtml(html, { filename }) {
      const page = (Object.keys(entries) as Page[]).find((key) =>
        filename.endsWith("/" + entries[key]),
      );
      if (!page) return html;

      const document = html.replace("<!--page-content-->", () =>
        renderPage(page),
      );
      return production
        ? document
        : document.replace(
            "</head>",
            '  <meta name="robots" content="noindex, nofollow">\n  </head>',
          );
    },
    generateBundle() {
      const identity = {
        commit:
          process.env.CF_PAGES_COMMIT_SHA ?? process.env.GITHUB_SHA ?? null,
        branch:
          process.env.CF_PAGES_BRANCH ?? process.env.GITHUB_REF_NAME ?? null,
        mode: production ? "production" : "preview",
      };
      const headers = production
        ? ""
        : "/*\n  X-Robots-Tag: noindex, nofollow\n\n";
      this.emitFile({
        type: "asset",
        fileName: "_headers",
        source: headers + "/build-info.json\n  Cache-Control: no-store\n",
      });
      this.emitFile({
        type: "asset",
        fileName: "build-info.json",
        source: JSON.stringify(identity) + "\n",
      });
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
