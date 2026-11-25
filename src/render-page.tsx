import { renderToStaticMarkup } from "react-dom/server";
import { SiteLayout, type Page } from "./components/site-layout.tsx";
import { HomePage } from "./pages/index.tsx";
import { PrivacyPage } from "./pages/privacy.tsx";
import { SupportPage } from "./pages/support.tsx";

const pages = {
  home: HomePage,
  privacy: PrivacyPage,
  support: SupportPage,
};

export function renderPage(page: Page) {
  const Content = pages[page];
  const markup = renderToStaticMarkup(
    <SiteLayout page={page}>
      <Content />
    </SiteLayout>,
  );

  // Cloudflare consumes these comments to preserve the native mailto links.
  return markup.replace(
    /<a\b[^>]* href="mailto:support@tvr\.works"[^>]*>[^<]*<\/a>/g,
    "<!--email_off-->$&<!--/email_off-->",
  );
}
