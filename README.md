# GolfTally site

The marketing, privacy and support site for [GolfTally](https://golftally.tvr.works/). Vite prerenders React into three static HTML pages. Tailwind CSS and shadcn Base Nova supply the shared theme and button variants. The demo uses the browser's native video player.

## Development

Use the Node version in `.node-version` and the npm version in `package.json`.

```sh
npm ci
npm run dev
npm run build
npm test
npm run preview
```

The build writes `dist/`. Vite renders the route entries through `src/render-page.tsx`, with the shared header and footer in `src/components/site-layout.tsx`. Public assets live in `public/assets/`. Keep the Cloudflare email directives around the rendered `mailto:` links so they remain usable without JavaScript.

## Publishing

Cloudflare Pages serves `/`, `/privacy`, and `/support` from `dist/`. Build with `npm run build && npm test`. Set `SITE_DEPLOYMENT_MODE=production` only in the production environment. Other builds emit noindex metadata and response headers. The public `/build-info.json` identifies the deployed commit, branch and mode.

The initial content and assets come from the published GolfTally marketing site at commit `904eca9`. The previous Pages deployment `7643c22a-a812-43f3-9775-581f19f1e015` is the pre-migration rollback point.

© 2026 TVR Works LLC.
