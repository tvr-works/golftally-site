import { buttonVariants } from "../components/ui/button.tsx";

export function HomePage() {
  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">iPhone · Apple Watch · Live Activities</p>
            <h1 id="hero-title">
              <span>Golf scoring.</span> <span>Kept simple.</span>
            </h1>
            <p className="lead">
              Keep a simple scorecard or switch mid-round to GPS yardage and
              shot placement. The shot map uses Apple Maps, with 3D satellite
              views where available.
            </p>
            <div className="hero-actions">
              <a
                className={buttonVariants({ size: "hero" })}
                href="#shot-map-video"
              >
                Watch the demo
              </a>
              <a className="hero-secondary" href="#features">
                Explore features
              </a>
            </div>
            <p className="hero-note">
              <strong>No account. No subscription.</strong> Your rounds stay on
              your device, with optional private iCloud sync.
            </p>
          </div>

          <div className="hero-phone">
            <div className="hero-phone-screen">
              <img
                src="/assets/shot-map-demo-poster.png"
                width="584"
                height="1200"
                fetchPriority="high"
                alt="GolfTally on iPhone showing the Scorecard and Shot Map switcher, three marked shots, and measured distances."
              />
            </div>
            <img
              className="hero-phone-frame hero-phone-frame-top"
              src="/assets/phone-frame.webp"
              width="862"
              height="1825"
              alt=""
            />
            <img
              className="hero-phone-frame hero-phone-frame-bottom"
              src="/assets/phone-frame.webp"
              width="862"
              height="1825"
              alt=""
            />
          </div>
        </div>
      </section>

      <section
        className="section"
        id="features"
        aria-labelledby="features-title"
      >
        <div className="section-inner">
          <h2 id="features-title">Score your way.</h2>
          <div className="experience-grid">
            <article className="experience-card">
              <h3>Scorecard</h3>
              <p>
                Start a 9- or 18-hole card for any course. Add scores as you go.
              </p>
            </article>
            <article className="experience-card">
              <h3>Shot Map</h3>
              <p>
                Check yardage to your target. Mark shots from where you stand or
                drop a pin on the map.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section
        className="section video-section"
        id="shot-map-demo"
        aria-labelledby="shot-map-demo-title"
      >
        <div className="section-inner video-layout">
          <div>
            <h2 id="shot-map-demo-title">Replay a hole.</h2>
            <p id="shot-map-demo-description">
              Follow the numbered shots to the green. The demo then switches
              holes and selects a shot to show its yardage.
            </p>
            <div className="mt-2 hidden short-landscape:block">
              <a
                className={buttonVariants({ variant: "link" })}
                href="/assets/shot-map-demo.mp4"
              >
                Open video
              </a>
            </div>
          </div>
          <div className="video-frame">
            <video
              id="shot-map-video"
              controls
              loop
              muted
              playsInline
              preload="metadata"
              poster="/assets/shot-map-demo-poster.png"
              aria-label="GolfTally shot map demo"
              aria-describedby="shot-map-demo-description"
            >
              <source src="/assets/shot-map-demo.mp4" type="video/mp4" />
              <a href="/assets/shot-map-demo.mp4">
                Download the shot map demo (MP4)
              </a>
            </video>
          </div>
        </div>
      </section>

      <section className="section alt" aria-labelledby="watch-title">
        <div className="section-inner">
          <h2 id="watch-title">Keep your phone in your pocket.</h2>
          <p>
            Enter scores on Apple Watch. On iPhone, see the current hole and
            score at a glance in a Live Activity.
          </p>
        </div>
      </section>
    </main>
  );
}
