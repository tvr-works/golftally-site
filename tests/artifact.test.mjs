import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import test from "node:test";

const output = new URL("../dist/", import.meta.url);
const origin = "https://golftally.tvr.works";
const routes = [
  { file: "index.html", path: "/", heading: "Golf scoring.", emailLinks: 1 },
  {
    file: "privacy.html",
    path: "/privacy",
    heading: "GolfTally privacy",
    emailLinks: 2,
  },
  {
    file: "support.html",
    path: "/support",
    heading: "Help for GolfTally.",
    emailLinks: 3,
  },
];

const build = JSON.parse(
  await readFile(new URL("build-info.json", output), "utf8"),
);
const headers = await readFile(new URL("_headers", output), "utf8");

for (const route of routes) {
  test(`prerenders ${route.path} with the shared header, footer and public links`, async () => {
    const html = await readFile(new URL(route.file, output), "utf8");
    assert.ok(html.includes(route.heading));
    assert.match(
      html,
      /<header class="site-header\b[^"]*">.*?<span class="app-availability">Coming soon<\/span><\/div><\/header>/su,
    );
    assert.match(
      html,
      /<a class="brand" href="\/" aria-label="GolfTally home">/u,
    );
    const canonical = origin + route.path;
    assert.ok(html.includes(`rel="canonical" href="${canonical}"`));
    assert.ok(html.includes(`property="og:url" content="${canonical}"`));
    assert.ok(
      html.includes(
        `property="og:image" content="${origin}/assets/social-card.jpg"`,
      ),
    );
    assert.match(html, /name="twitter:card" content="summary_large_image"/u);
    assert.match(
      html,
      /<footer\b.*?© 2026 TVR Works LLC.*?<a href="\/privacy"[^>]*>Privacy<\/a>.*?<a href="\/support"[^>]*>Support<\/a>.*?<\/footer>/su,
    );
    assert.equal(
      [
        ...html.matchAll(
          /<!--email_off--><a\b[^>]* href="mailto:support@tvr\.works"[^>]*>[^<]*<\/a><!--\/email_off-->/gu,
        ),
      ].length,
      route.emailLinks,
    );
    assert.doesNotMatch(
      html,
      /<script\b(?! type="application\/ld\+json")|<link\b[^>]*rel="modulepreload"|<!--page-(?:content|metadata)-->/u,
    );
    assert.doesNotMatch(html, /<meta\b[^>]*\bnoindex\b/iu);

    const stylesheet = html.match(/href="(\/assets\/[^"]+\.css)"/u)?.[1];
    assert.ok(stylesheet);
    assert.ok((await stat(new URL(stylesheet.slice(1), output))).size > 0);

    const siteName = html.match(
      /<script type="application\/ld\+json">([^<]+)<\/script>/u,
    )?.[1];
    if (route.path === "/") {
      assert.ok(siteName);
      assert.deepEqual(JSON.parse(siteName), {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "GolfTally",
        url: canonical,
      });
      assert.match(
        html,
        /<a\b[^>]* href="#shot-map-video">Watch the demo<\/a>/u,
      );
      assert.match(html, /<a\b[^>]* href="#features">Explore features<\/a>/u);
      assert.match(
        html,
        /<a\b[^>]* href="\/assets\/shot-map-demo\.mp4">Open video<\/a>/u,
      );
      assert.match(
        html,
        /<video id="shot-map-video" controls=""[^>]*><source src="\/assets\/shot-map-demo\.mp4" type="video\/mp4"/u,
      );
    } else {
      assert.equal(siteName, undefined);
      assert.ok(html.includes(`href="${route.path}" aria-current="page"`));
    }
  });
}

test("includes only the site assets and a stylesheet in the public assets directory", async () => {
  const assets = await readdir(new URL("assets/", output));
  assert.deepEqual(assets.filter((name) => !name.endsWith(".css")).toSorted(), [
    "golf-background.png",
    "golf-tally-icon.png",
    "phone-frame.webp",
    "shot-map-demo-poster.png",
    "shot-map-demo.mp4",
    "social-card.jpg",
  ]);
  assert.equal(assets.filter((name) => name.endsWith(".css")).length, 1);
  await Promise.all(
    assets.map(async (name) => {
      const { size } = await stat(new URL(`assets/${name}`, output));
      assert.ok(size > 0 && size <= 25 * 1024 * 1024, name);
    }),
  );
});

test("identifies the expected build and removes the crawler header", () => {
  assert.deepEqual(build, {
    commit: process.env.CF_PAGES_COMMIT_SHA ?? process.env.GITHUB_SHA ?? null,
    branch: process.env.CF_PAGES_BRANCH ?? process.env.GITHUB_REF_NAME ?? null,
    mode:
      process.env.SITE_DEPLOYMENT_MODE === "production"
        ? "production"
        : "preview",
  });
  assert.doesNotMatch(headers, /noindex/iu);
  assert.match(headers, /^\/\*\n  ! X-Robots-Tag$/mu);
  assert.match(headers, /\/build-info\.json\n  Cache-Control: no-store/u);
});

test("publishes the canonical sitemap in production", async () => {
  const robots = await readFile(new URL("robots.txt", output), "utf8");
  assert.match(robots, /^User-agent: \*\nAllow: \/\n/u);
  const sitemap = new URL("sitemap.xml", output);
  if (build.mode === "production") {
    assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml\n`));
    const xml = await readFile(sitemap, "utf8");
    assert.match(
      xml,
      /<urlset xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9">/u,
    );
    assert.deepEqual(
      Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/gu), ([, url]) => url),
      routes.map(({ path }) => origin + path),
    );
  } else {
    assert.doesNotMatch(robots, /^Sitemap:/mu);
    await assert.rejects(readFile(sitemap, "utf8"), { code: "ENOENT" });
  }
});

test("renders a 404 document with a way back home", async () => {
  const html = await readFile(new URL("404.html", output), "utf8");
  assert.match(html, /<h1>Page not found<\/h1>/u);
  assert.doesNotMatch(html, /<meta\b[^>]*\bnoindex\b/iu);
  assert.match(html, /href="\/">Back to GolfTally<\/a>/u);
  assert.doesNotMatch(html, /rel="canonical"|property="og:url"|<script\b/u);
});
