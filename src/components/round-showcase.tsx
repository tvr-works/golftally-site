import { PhoneFrame } from "./phone-frame.tsx";
import { buttonVariants } from "./ui/button.tsx";

type ScoringFeatureProps = {
  title: string;
  summary: string;
  recording: "scorecard" | "shot-map";
  description: string;
};

function ScoringFeature({
  title,
  summary,
  recording,
  description,
}: ScoringFeatureProps) {
  const isShotMap = recording === "shot-map";
  const demoId = `${recording}-demo`;
  const titleId = `${demoId}-title`;
  const descriptionId = `${demoId}-description`;
  const source = `/assets/${demoId}.mp4`;
  const poster = `/assets/${demoId}-poster.webp`;

  return (
    <article
      className={`scoring-card ${recording}-feature`}
      id={demoId}
      aria-labelledby={titleId}
    >
      <div>
        <h3 id={titleId}>{title}</h3>
        <p>{summary}</p>
        <p className="sr-only" id={descriptionId}>
          {description}
        </p>
        <div className="mt-2 hidden short-landscape:block">
          <a
            className={buttonVariants({ variant: "link" })}
            href={source}
            aria-label={`Open video: ${title}`}
          >
            Open video
          </a>
        </div>
      </div>
      <PhoneFrame className="demo-phone">
        <video
          id={`${recording}-video`}
          controls
          muted
          playsInline
          preload={isShotMap ? "metadata" : "none"}
          poster={poster}
          aria-label={`GolfTally ${title} demo`}
          aria-describedby={descriptionId}
        >
          <source src={source} type="video/mp4" />
          <a href={source}>Download the {title} demo (MP4)</a>
        </video>
      </PhoneFrame>
    </article>
  );
}

export function ScoringFeatures() {
  return (
    <section
      className="scoring-section"
      id="features"
      aria-labelledby="features-title"
    >
      <div className="showcase-inner">
        <h2 id="features-title">Score your way.</h2>
        <div className="scoring-grid">
          <ScoringFeature
            title="Scorecard"
            summary="Start a 9- or 18-hole card for any course. Add scores as you go."
            recording="scorecard"
            description="The demo opens a hole, enters shots and putts, then saves the score back to the card."
          />
          <ScoringFeature
            title="Shot Map"
            summary="Mark shots on Apple Maps, check yardages, and log your putts."
            recording="shot-map"
            description="The map flies up the fairway, then the demo marks a chip onto the green and adds two putts to finish the hole."
          />
        </div>
      </div>
    </section>
  );
}

export function WatchFeature() {
  return (
    <section className="watch-section" aria-labelledby="watch-title">
      <div className="showcase-inner watch-layout">
        <div className="watch-copy">
          <h2 id="watch-title">Keep your phone in your pocket.</h2>
          <p>
            Add strokes and putts to your scorecard from your wrist. On
            iPhone, a Live Activity shows your current hole and score at a glance.
          </p>
        </div>
        <img
          src="/assets/watch-on-course.webp"
          width="1008"
          height="672"
          loading="lazy"
          alt=""
        />
      </div>
    </section>
  );
}
