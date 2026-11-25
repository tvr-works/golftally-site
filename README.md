# GolfTally site

The marketing, privacy and support site for [GolfTally](https://golftally.tvr.works/). Vite prerenders React into three public pages and a 404 document. Tailwind CSS and shadcn Base Nova supply the shared theme and button variants. The demo uses the browser's native video player.

## Development

Use the Node version in `.node-version` and the npm version in `package.json`.

```sh
npm ci
npm run dev
npm run lint
npm run build
npm test
npm run preview
```

The build writes `dist/`. Vite renders the route entries through `src/render-page.tsx`, with the shared header and footer in `src/components/site-layout.tsx`. Public assets live in `public/assets/`. Keep the Cloudflare email directives around the rendered `mailto:` links so they remain usable without JavaScript.

`npm run lint` runs Oxlint and the shadcn design-system rules from `.oxlintrc.json`. The build runs the same check for GitHub CI and Cloudflare Pages.

The development-only shadcn CLI uses a scoped `minimatch` override until its dependency chain resolves a patched version. [Advisory](https://github.com/advisories/GHSA-g3hv-75wg-m249)

## Publishing

Cloudflare Pages serves `/`, `/privacy`, and `/support` from `dist/`. Build with `npm run build && npm test`. Set `SITE_DEPLOYMENT_MODE=production` only in the production environment. The public `/build-info.json` identifies the deployed commit, branch and mode.

The initial content and assets come from the published GolfTally marketing site at commit `904eca9`. The previous Pages deployment `7643c22a-a812-43f3-9775-581f19f1e015` is the pre-migration rollback point.


## Search and sharing

`src/site.ts` defines page titles, summaries, and canonical paths. Production builds publish `robots.txt` and a sitemap listing those canonical URLs.

To refresh the social preview, open `/scripts/social-card.html` in the local dev server at 1,200 × 630 and save the JPEG as `public/assets/social-card.jpg`.

© 2026 TVR Works LLC.
