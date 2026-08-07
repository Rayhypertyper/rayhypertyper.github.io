import { useEffect, useState } from "react";
import { FilterTabs, type FilterName } from "./components/FilterTabs";
import { SearchBar } from "./components/SearchBar";
import { SearchResultCard } from "./components/SearchResultCard";
import { PersonalGlobe } from "./components/PersonalGlobe";
import { AISummary } from "./components/AISummary";
import { ProjectsShowcase } from "./components/ProjectsShowcase";
import { ExperienceTimeline } from "./components/ExperienceTimeline";
import { AboutSection } from "./components/AboutSection";
import { ContactSection } from "./components/ContactSection";
import { UnderConstructionOverlay } from "./components/UnderConstructionOverlay";
import { findSearchMatch } from "./search";
import "./globe.css";

export function App() {
  const [activeFilter, setActiveFilter] = useState<FilterName>("All");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = isDarkMode ? "dark" : "light";
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", isDarkMode ? "#07101f" : "#f9f7f3");
  }, [isDarkMode]);

  useEffect(() => {
    document.documentElement.dataset.contactPage =
      activeFilter === "Contact" ? "true" : "false";
  }, [activeFilter]);

  const resultCount =
    activeFilter === "All"
      ? "About 1 result (0.01s)"
    : activeFilter === "Map"
        ? "About 2 locations (0.01s)"
        : activeFilter === "Experience"
          ? "About 3 results (0.01s)"
          : activeFilter === "About"
            ? "A little more about Ray"
            : activeFilter === "Contact"
              ? "About 5 results (0.01s)"
            : undefined;

  const handleSearch = (query: string) => {
    setActiveFilter(findSearchMatch(query).filter);
  };

  return (
    <section
      className={`search-panel w-full rounded-[30px] border border-[rgba(20,20,30,0.04)] bg-[rgba(255,255,255,0.96)] px-5 pb-6 pt-6 text-[#263044] shadow-[0_28px_70px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.9)] sm:rounded-[40px] sm:px-8 sm:pb-8 sm:pt-9 lg:rounded-[52px] lg:px-14 lg:pb-7 lg:pt-8${activeFilter === "Map" ? " map-search-panel" : ""}${activeFilter === "Contact" ? " contact-search-panel" : ""}`}
      id="results"
      aria-label="Portfolio sections"
    >
      <div className="search-panel__inner">
        <SearchBar onSearch={handleSearch} />

        <FilterTabs
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          resultCount={resultCount}
        />

        <div
          className={`search-results-stack ${
            activeFilter === "All" ? "all-results" : ""
          } mt-[10px] transition-[opacity,transform] duration-200 motion-reduce:transition-none ${
            activeFilter === "Map" ? "map-results" : ""
          } translate-y-0 opacity-100`}
        >
          {activeFilter === "Projects" ? (
            <ProjectsShowcase />
          ) : activeFilter === "All" ? (
            <div>
              <div className="result-stack grid gap-[10px]">
                <SearchResultCard compact sponsored variant="waterloo" />
                <AISummary />
              </div>
            </div>
          ) : activeFilter === "Map" ? (
            <section
              className="portfolio-map-panel"
              id="mapPanel"
              aria-label="Places on my map"
            >
              <div
                className="places-map"
                aria-label="Map with markers at the University of Waterloo and Ottawa"
              >
                <div className="personal-globe-root">
                  <PersonalGlobe />
                </div>
              </div>
            </section>
          ) : activeFilter === "Experience" ? (
            <ExperienceTimeline />
          ) : activeFilter === "About" ? (
            <div className="about-under-construction">
              <div className="about-under-construction__content" aria-hidden="true">
                <AboutSection onContactClick={() => setActiveFilter("Contact")} />
              </div>
              <UnderConstructionOverlay />
            </div>
          ) : activeFilter === "Contact" ? (
            <ContactSection
              isDarkMode={isDarkMode}
              onToggleTheme={() => setIsDarkMode((current) => !current)}
            />
          ) : (
            <SearchResultCard variant="profile" />
          )}
        </div>
      </div>
    </section>
  );
}
