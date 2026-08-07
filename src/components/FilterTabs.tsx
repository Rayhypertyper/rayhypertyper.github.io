export const FILTERS = [
  "All",
  "Projects",
  "Experience",
  "About",
  "Map",
  "Contact",
] as const;

export type FilterName = (typeof FILTERS)[number];

interface FilterTabsProps {
  activeFilter: FilterName;
  onFilterChange: (filter: FilterName) => void;
  resultCount?: string;
}

export function FilterTabs({
  activeFilter,
  onFilterChange,
  resultCount = "About 5 results (0.01s)",
}: FilterTabsProps) {
  return (
    <div className="relative z-20 mt-7">
      <div className="filters-scroll">
        <div
          className="flex flex-wrap items-start gap-x-8 gap-y-5 px-1 sm:min-w-max sm:flex-nowrap sm:gap-11 sm:px-2 lg:gap-[54px] lg:px-3"
          role="tablist"
          aria-label="Search categories"
        >
          {FILTERS.map((filter) => {
            const isActive = filter === activeFilter;

            return (
              <button
                key={filter}
                className={`filter-tab relative pb-[14px] text-[15px] font-normal leading-none transition-colors duration-200 after:absolute after:bottom-0 after:left-1/2 after:h-[3px] after:w-8 after:-translate-x-1/2 after:rounded-full after:bg-[#6547e8] after:transition-transform after:duration-200 hover:text-[#6547e8] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#6547e8]/15 motion-reduce:transition-none motion-reduce:after:transition-none sm:text-base ${
                  isActive
                    ? "text-[#6547e8] after:scale-x-100"
                    : "text-[#596174] after:scale-x-0"
                } ${filter === "All" ? "lg:mr-3" : ""}`}
                type="button"
                role="tab"
                data-filter-tab={filter.toLowerCase()}
                aria-selected={isActive}
                onClick={() => onFilterChange(filter)}
              >
                <span data-filter-label={filter.toLowerCase()}>{filter}</span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="filter-result-count mt-4 px-1 text-[15px] font-normal text-[#62697a] sm:px-2 lg:absolute lg:mt-[-29px] lg:right-[62px] lg:px-0 lg:text-base">
        {resultCount}
      </p>
    </div>
  );
}
