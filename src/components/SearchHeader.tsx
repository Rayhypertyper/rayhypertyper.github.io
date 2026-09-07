import { FilterTabs, type FilterName } from "./FilterTabs";
import { SearchBar } from "./SearchBar";

interface SearchHeaderProps {
  onSearch: (query: string) => void;
  activeFilter: FilterName;
  onFilterChange: (filter: FilterName) => void;
  resultCount?: string;
}

/** The hero's canonical search and navigation, shared across every section. */
export function SearchHeader({ onSearch, ...tabs }: SearchHeaderProps) {
  return (
    <div className="search-header">
      <SearchBar onSearch={onSearch} />
      <FilterTabs {...tabs} />
    </div>
  );
}
