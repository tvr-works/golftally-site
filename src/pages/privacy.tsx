export function PrivacyPage() {
  return (
    <main className="py-14 short-landscape:py-6">
      <article className="body-copy privacy-notice">
        <header>
          <h1>GolfTally privacy</h1>
          <p className="notice-date">
            <time dateTime="2026-11-24">November 24, 2026</time>
          </p>
          <p>
            GolfTally helps you keep score, measure yardage and mark shots on
            iPhone and Apple Watch. You can use GolfTally without creating a TVR
            Works account.
          </p>
        </header>

        <section>
          <h2>Rounds and location</h2>
          <p>
            GolfTally saves the rounds you create, including round names, hole
            scores and the tee, target and shot locations you mark. The iPhone
            app uses Apple Maps to show your shot map.
          </p>
          <p>
            With your permission, GolfTally uses your location during a round to
            measure yardage and mark where you took a shot. You can change
            location access in your device settings. Scorekeeping works without
            location access.
          </p>
        </section>

        <section>
          <h2>Devices and iCloud</h2>
          <p>
            GolfTally stores rounds on your device. The iPhone app also saves
            your shot map controls preference on that device.
          </p>
          <p>
            When iCloud sync is available and enabled, rounds, including saved
            locations, can sync to your devices through Apple’s CloudKit service
            in your private iCloud storage.
          </p>
          <p>
            The iPhone app and its paired Apple Watch can also exchange round
            updates through Apple’s WatchConnectivity service. If Live
            Activities are enabled, GolfTally can show the round name and scores
            on the iPhone Lock Screen, and scoring progress in the Dynamic
            Island or on a supported Apple Watch.
          </p>
        </section>

        <section>
          <h2>Deleting a round</h2>
          <p>
            Delete a round in GolfTally to remove it and its saved scores and
            markers from that device. The deletion can reach the paired device
            through WatchConnectivity and can sync through iCloud for rounds
            stored there.
          </p>
          <p>
            To review your iCloud storage and backups on iPhone, open Settings,
            tap your name, then tap iCloud.
          </p>
        </section>

        <section>
          <h2>Advertising and tracking</h2>
          <p>
            The GolfTally app has no third-party advertising or analytics SDKs
            and does not use round data for cross-app tracking.
          </p>
        </section>

        <section>
          <h2>Support and privacy requests</h2>
          <p>
            If you email support, we receive your email address, message and any
            attachments you send. We use them to respond and help with your
            request.
          </p>
          <p>
            For privacy questions or to ask us to delete information you sent,
            email{" "}
            <a className="contact-link" href="mailto:support@tvr.works">
              support@tvr.works
            </a>
            .
          </p>
        </section>
      </article>
    </main>
  );
}
