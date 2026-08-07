import {
  ArrowRight,
  Construction,
  ExternalLink,
  Settings,
} from "lucide-react";
import { useRef } from "react";
import { PaperPlaneDoodle } from "./PaperPlaneDoodle";

const projects = [
  {
    title: "Youthward",
    slug: "youthward",
    date: "Jan 2025",
    description: "Connecting Canadian youth with opportunities and resources.",
    kind: "dashboard",
  },
  {
    title: "DepartCan",
    slug: "departcan",
    date: "Feb 2025",
    description: "Find the fastest border crossing routes with real-time wait times.",
    kind: "border-map",
    href: "https://github.com/Rayhypertyper/DepartCan",
  },
  {
    title: "Ingredia",
    slug: "ingredia",
    date: "Aug 2025",
    description: "Scan food labels with OCR, product lookup, and additive flags.",
    kind: "ingredia",
    href: "https://github.com/Rayhypertyper/Ingredia",
  },
  {
    title: "Music Recommender",
    slug: "music-recommender",
    date: "Nov 2024",
    description: "Built a content-based music recommender with TF-IDF vectorization to find similar tracks.",
    kind: "music-dashboard",
    href: "https://github.com/Rayhypertyper/Music-Recommender",
  },
] as const;

type ProjectKind = (typeof projects)[number]["kind"];

function ProjectThumbnail({ kind }: { kind: ProjectKind }) {
  const isMap = kind.endsWith("map");
  const isIngredia = kind === "ingredia";

  return (
    <span className={`project-thumb project-thumb--${kind}`} aria-hidden="true">
      {isIngredia ? (
        <>
          <i className="ingredia-scan-frame" />
          <i className="ingredia-ring" />
          <i className="ingredia-leaf ingredia-leaf--one" />
          <i className="ingredia-leaf ingredia-leaf--two" />
          <i className="ingredia-label-line ingredia-label-line--one" />
          <i className="ingredia-label-line ingredia-label-line--two" />
        </>
      ) : isMap ? (
        <>
          <i className="map-road map-road--one" />
          <i className="map-road map-road--two" />
          <i className="map-road map-road--three" />
          <i className="map-node map-node--one" />
          <i className="map-node map-node--two" />
          <i className="map-node map-node--three" />
          <i className="map-node map-node--four" />
        </>
      ) : (
        <>
          <i className="dashboard-line dashboard-line--one" />
          <i className="dashboard-line dashboard-line--two" />
          <i className="dashboard-line dashboard-line--three" />
          <i className="dashboard-line dashboard-line--four" />
          <i className="dashboard-panel" />
        </>
      )}
    </span>
  );
}

function TechChip({ kind, children }: { kind: string; children: string }) {
  const logo = `/featured-${kind}-logo.png`;

  return (
    <span className="projects-tech-chip">
      <img className="projects-tech-chip__logo" src={logo} alt="" aria-hidden="true" />
      {children}
    </span>
  );
}

function ProjectListItem({ project }: { project: (typeof projects)[number] }) {
  const isComingSoon = project.slug === "youthward";
  const projectContent = (
    <>
      <ProjectThumbnail kind={project.kind} />
      <span className="projects-list__body" aria-hidden={isComingSoon}>
        <strong>{project.title}</strong>
        <small>rayxu.dev&nbsp; / &nbsp;projects&nbsp; /<br />{project.slug}</small>
        <span>{project.description}</span>
        <time>{project.date}</time>
      </span>
      <ArrowRight className="projects-list__arrow" size={18} strokeWidth={1.7} aria-hidden="true" />
    </>
  );

  if (isComingSoon) {
    return (
      <article
        className="projects-list__item projects-list__item--coming-soon"
        aria-label={`${project.title} coming soon`}
      >
        {projectContent}
        <div className="projects-list__coming-soon" role="status">
          <Construction size={20} strokeWidth={1.7} aria-hidden="true" />
          <span>Coming soon</span>
        </div>
      </article>
    );
  }

  const projectHref = project.href;

  return (
    <a
      className="projects-list__item"
      href={projectHref}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${project.title}`}
    >
      {projectContent}
    </a>
  );
}

export function ProjectsShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const playProjectFullscreen = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    void video.play().catch(() => {
      // The browser may block playback if the click is no longer considered user initiated.
    });

    if (video.requestFullscreen) {
      void video.requestFullscreen().catch(() => {
        // Playback still starts when fullscreen is unavailable or denied.
      });
      return;
    }

    const legacyVideo = video as HTMLVideoElement & {
      webkitEnterFullscreen?: () => void;
    };
    legacyVideo.webkitEnterFullscreen?.();
  };

  return (
    <section className="projects-showcase" aria-label="Featured projects">
      <article className="projects-feature">
        <div className="projects-feature__copy">
          <div className="projects-feature__badge-row">
            <span className="projects-rays projects-rays--left" aria-hidden="true">
              <i /><i /><i />
            </span>
            <span className="projects-feature__badge"><span>★</span> FEATURED PROJECT</span>
            <span className="projects-rays projects-rays--right" aria-hidden="true">
              <i /><i /><i />
            </span>
          </div>
          <div className="projects-feature__title-row">
            <h2>Invisible Keyboard</h2>
            <Settings className="projects-feature__settings" size={48} strokeWidth={1.5} aria-hidden="true" />
          </div>
          <p>An AI-powered system that detects and recognizes keystrokes using only a webcam and deep learning.</p>
          <div className="projects-tech-chips" aria-label="Technologies used">
            <TechChip kind="python">Python</TechChip>
            <TechChip kind="pytorch">PyTorch</TechChip>
            <TechChip kind="opencv">OpenCV</TechChip>
            <TechChip kind="mediapipe">MediaPipe</TechChip>
          </div>
          <div className="projects-feature__actions">
            <button
              type="button"
              className="projects-feature__button"
              onClick={playProjectFullscreen}
              aria-label="Play Invisible Keyboard project demo in fullscreen"
            >
              <span className="projects-green-arrow" aria-hidden="true" />
              View Project <ArrowRight size={16} />
            </button>
            <a
              href="https://github.com/Rayhypertyper/Invisible-Keyboard"
              target="_blank"
              rel="noreferrer"
              className="projects-feature__github"
              aria-label="Open Invisible Keyboard project on GitHub"
            >
              <img src="/github-logo.png" alt="" aria-hidden="true" />
              <span>GitHub</span>
              <ExternalLink size={15} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="projects-feature__media">
          <video
            ref={videoRef}
            className="projects-feature__video"
            controls
            playsInline
            preload="metadata"
            poster="/invisible-keyboard-demo-poster.jpg"
            aria-label="Invisible Keyboard project demo"
          >
            <source src="/invisible-keyboard-demo.mp4" type="video/mp4" />
            Your browser does not support embedded video.
          </video>
        </div>

        <div className="projects-feature__metrics" aria-label="Project metrics">
          <div className="projects-metric">
            <span className="projects-metric__icon projects-metric__icon--green">
              <img
                className="projects-metric__precision-icon"
                src="/press-precision-icon.png"
                alt=""
                aria-hidden="true"
              />
            </span>
            <strong>95.6%</strong><small>Press Precision</small>
          </div>
          <div className="projects-metric">
            <span className="projects-metric__icon projects-metric__icon--blue">
              <img
                className="projects-metric__recall-icon"
                src="/recall-icon.png"
                alt=""
                aria-hidden="true"
              />
            </span>
            <strong>95.7%</strong><small>Recall</small>
          </div>
          <div className="projects-metric">
            <span className="projects-metric__icon projects-metric__icon--speed">
              <img src="/typing-speed-symbol.png" alt="" aria-hidden="true" />
            </span>
            <strong>80 Words Per Minute</strong><small>Speed</small>
          </div>
          <div className="projects-feature__doodle" aria-hidden="true">
            <PaperPlaneDoodle />
          </div>
        </div>
      </article>

      <div className="projects-divider" aria-hidden="true" />

      <div className="projects-list">
        {projects.map((project) => (
          <ProjectListItem project={project} key={project.slug} />
        ))}
      </div>
    </section>
  );
}
