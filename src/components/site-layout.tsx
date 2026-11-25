import type { ReactNode } from "react";

export type Page = "home" | "privacy" | "support";

export function SiteLayout({
  page,
  children,
}: {
  page: Page;
  children: ReactNode;
}) {
  return (
    <>
      <header className="site-header sticky top-0 z-10">
        <div className="nav">
          <a className="brand" href="/" aria-label="GolfTally home">
            <img src="/assets/golf-tally-icon.png" alt="" />
            <span>GolfTally</span>
          </a>
          <span className="app-availability">Coming soon</span>
        </div>
      </header>

      {children}

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-legal">
            <small>© 2026 TVR Works LLC</small>
            <span className="footer-legal-links">
              <span aria-hidden="true">·</span>
              <a href="https://tvr.works/software">Software</a>
              <span aria-hidden="true">·</span>
              <a
                href="/privacy"
                aria-current={page === "privacy" ? "page" : undefined}
              >
                Privacy
              </a>
            </span>
          </div>
          <nav className="footer-product" aria-label="GolfTally footer">
            <a
              href="/support"
              aria-current={page === "support" ? "page" : undefined}
            >
              Support
            </a>
            <a href="mailto:support@tvr.works">Contact</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
