import { buttonVariants } from "../components/ui/button.tsx";

export function SupportPage() {
  return (
    <main className="page-main">
      <section className="page-title">
        <p className="eyebrow">Support</p>
        <h1>Help for GolfTally.</h1>
        <p>
          GolfTally is an independently developed, Apple-native golf app for
          iPhone and Apple Watch. Support is handled directly by the developer
          through email.
        </p>
        <div className="actions">
          <a className={buttonVariants()} href="mailto:support@tvr.works">
            Email Support
          </a>
        </div>
      </section>

      <section className="page-grid">
        <article className="support-card">
          <h2>Support Approach</h2>
          <p>
            GolfTally does not run a staffed support desk or offer a formal
            response-time SLA. The app is actively maintained and personally
            used by its developer, and practical bug reports are reviewed
            seriously.
          </p>
        </article>

        <article className="support-card">
          <h2>What To Include</h2>
          <ul>
            <li>Device model</li>
            <li>Whether the issue happened on iPhone or Apple Watch</li>
            <li>iOS or watchOS version</li>
            <li>What you expected to happen</li>
            <li>What happened instead</li>
            <li>Screenshots if they help explain the issue</li>
          </ul>
        </article>

        <article className="support-card">
          <h2>Does GolfTally require an account?</h2>
          <p>No. GolfTally does not require account creation or login.</p>
        </article>

        <article className="support-card">
          <h2>Where is my data stored?</h2>
          <p>
            Round data is stored on the device and can sync through the user's
            private iCloud storage when iCloud is enabled. GolfTally does not
            run a separate developer-hosted user database.
          </p>
        </article>

        <article className="support-card">
          <h2>Does GolfTally need a course database?</h2>
          <p>
            No. GolfTally is intentionally open ended. It can be used for real
            courses, custom rounds, practice sessions, or made-up scorecards
            without needing a predefined course database.
          </p>
        </article>

        <article className="support-card">
          <h2>Do I need location enabled?</h2>
          <p>
            No for scorekeeping. Yes for features that measure yardage or let
            the user mark shots from their current position.
          </p>
        </article>

        <article className="support-card">
          <h2>Does GolfTally support Apple Watch?</h2>
          <p>
            Yes. GolfTally includes an Apple Watch companion and supports round
            workflows across iPhone and Apple Watch.
          </p>
        </article>

        <article className="support-card">
          <h2>Contact</h2>
          <p>
            Email{" "}
            <a className="contact-link" href="mailto:support@tvr.works">
              support@tvr.works
            </a>{" "}
            with support questions or bug reports.
          </p>
        </article>
      </section>
    </main>
  );
}
