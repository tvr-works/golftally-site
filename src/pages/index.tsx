import {
  ScoringFeatures,
  WatchFeature,
} from "../components/round-showcase.tsx";
import { Button } from "../components/ui/button.tsx";

export function HomePage() {
  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-inner">
          <p className="eyebrow">iPhone · Apple Watch</p>
          <h1 id="hero-title">
            <span>Golf scoring.</span> <span>Kept simple.</span>
          </h1>
          <p className="lead">
            Add a stroke to your scorecard on Apple Watch or iPhone. When you
            reach your ball, drop a pin in Shot Map on iPhone and see the hole
            in 3D with Apple Maps. There’s no account or subscription, and your
            rounds are saved on your device with optional private iCloud sync.
          </p>
          <div className="download-action">
            <Button
              size="hero"
              disabled
              focusableWhenDisabled
              aria-describedby="download-status"
            >
              Download
            </Button>
            <span id="download-status" className="download-status" role="tooltip">
              Coming soon
            </span>
          </div>
        </div>
      </section>

      <ScoringFeatures />
      <WatchFeature />
    </main>
  );
}
