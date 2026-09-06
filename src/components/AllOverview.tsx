import { ArrowUpRight } from "lucide-react";
import { AISummary } from "./AISummary";
import { SearchResultCard } from "./SearchResultCard";

interface AllOverviewProps {
  onProjectsClick: () => void;
}

export function AllOverview({ onProjectsClick }: AllOverviewProps) {
  const openProjects = () => {
    onProjectsClick();
    document
      .querySelector<HTMLButtonElement>('[data-filter-tab="projects"]')
      ?.focus({ preventScroll: true });
  };

  return (
    <div className="all-overview">
      <div className="all-overview__main">
        <div className="all-overview__introduction">
          <h1 className="all-overview__name">
            Ray Xu<span aria-hidden="true">.</span>
          </h1>
          <AISummary />
        </div>

        <article className="all-project" aria-labelledby="all-project-title">
          <div className="all-project__heading">
            <span>Featured project</span>
            <span>Computer Vision</span>
          </div>
          <button
            className="all-project__preview"
            type="button"
            onClick={openProjects}
            aria-label="Explore the Invisible Keyboard project"
          >
            <img
              src="/invisible-keyboard-demo-poster.jpg"
              alt="Webcam demo tracking hand movements over a virtual keyboard"
              width="1280"
              height="664"
              fetchPriority="high"
            />
          </button>
          <div className="all-project__details">
            <h2 id="all-project-title">Invisible Keyboard</h2>
            <p>
              An AI-powered system that detects and recognizes keystrokes using
              only a webcam and deep learning.
            </p>
            <button
              className="all-project__link"
              type="button"
              onClick={openProjects}
            >
              Explore project
              <ArrowUpRight size={18} strokeWidth={1.7} aria-hidden="true" />
            </button>
          </div>
        </article>
      </div>

      <div className="all-overview__education">
        <SearchResultCard compact sponsored variant="waterloo" />
      </div>
    </div>
  );
}
