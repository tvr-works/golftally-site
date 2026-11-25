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
    assert.ok(html.includes(`rel="canonical" href="${origin}${route.path}"`));
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
      /<(?:script\b|link\b[^>]*rel="modulepreload")|<!--page-content-->/u,
    );
    assert.equal(
      html.includes('name="robots" content="noindex, nofollow"'),
      build.mode === "preview",
    );

    const stylesheet = html.match(/href="(\/assets\/[^"]+\.css)"/u)?.[1];
    assert.ok(stylesheet);
    assert.ok((await stat(new URL(stylesheet.slice(1), output))).size > 0);

    if (route.path === "/") {
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
  ]);
  assert.equal(assets.filter((name) => name.endsWith(".css")).length, 1);
  await Promise.all(
    assets.map(async (name) => {
      const { size } = await stat(new URL(`assets/${name}`, output));
      assert.ok(size > 0 && size <= 25 * 1024 * 1024, name);
    }),
  );
});

test("identifies the expected build and excludes previews from indexing", () => {
  assert.deepEqual(build, {
    commit: process.env.CF_PAGES_COMMIT_SHA ?? process.env.GITHUB_SHA ?? null,
    branch: process.env.CF_PAGES_BRANCH ?? process.env.GITHUB_REF_NAME ?? null,
    mode:
      process.env.SITE_DEPLOYMENT_MODE === "production"
        ? "production"
        : "preview",
  });
  assert.equal(
    headers.includes("X-Robots-Tag: noindex, nofollow"),
    build.mode === "preview",
  );
  assert.match(headers, /\/build-info\.json\n  Cache-Control: no-store/u);
});
