import { renderToStaticMarkup } from "react-dom/server";
import { SiteLayout } from "./components/site-layout.tsx";
import { HomePage } from "./pages/index.tsx";
import { NotFoundPage } from "./pages/not-found.tsx";
import { PrivacyPage } from "./pages/privacy.tsx";
import { SupportPage } from "./pages/support.tsx";
import { siteName, siteOrigin, sitePages, type Page } from "./site.ts";

const pages = {
  home: HomePage,
  privacy: PrivacyPage,
  support: SupportPage,
  notFound: NotFoundPage,
};

export function renderPage(page: Page) {
  const Content = pages[page];
  const markup = renderToStaticMarkup(
    <SiteLayout page={page}>
      <Content />
    </SiteLayout>,
  );

  // Cloudflare consumes these comments to preserve the native mailto links.
  return markup.replaceAll(
    /<a\b[^>]* href="mailto:support@tvr\.works"[^>]*>[^<]*<\/a>/gu,
    "<!--email_off-->$&<!--/email_off-->",
  );
}

const shareImage = siteOrigin + "/assets/social-card.jpg";
const shareImageAlt =
  "GolfTally. Golf scoring. Kept simple. The shot map on iPhone shows a golf hole and marked shots.";

export function renderMetadata(page: Page) {
  const { path, title, description } = sitePages[page];
  const canonical = path === null ? null : siteOrigin + path;

  return renderToStaticMarkup(
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical && (
        <>
          <link rel="canonical" href={canonical} />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content={siteName} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:url" content={canonical} />
          <meta property="og:image" content={shareImage} />
          <meta property="og:image:type" content="image/jpeg" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content={shareImageAlt} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={shareImage} />
          <meta name="twitter:image:alt" content={shareImageAlt} />
        </>
      )}
      {page === "home" && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteName,
            url: canonical,
          })}
        </script>
      )}
    </>,
  );
}
