import { ArrowRight, Search } from "lucide-react";
import { FormEvent, useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("Ray Xu");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSearch(query);
  };

  return (
    <form
      className="search-bar mx-0 flex min-w-0 items-center rounded-full border border-[#ecebe8] bg-white shadow-[0_9px_24px_rgba(49,42,35,0.065),inset_0_1px_0_rgba(255,255,255,0.96)] lg:mx-8"
      role="search"
      onSubmit={handleSubmit}
    >
      <Search
        aria-hidden="true"
        className="h-7 w-7 shrink-0 text-[#5c6679] sm:h-8 sm:w-8 lg:h-[34px] lg:w-[34px]"
        strokeWidth={1.8}
      />

      <label className="min-w-0 flex-1" htmlFor="portfolio-search">
        <span className="sr-only">Search Ray Xu&apos;s portfolio</span>
        <input
          id="portfolio-search"
          className="w-full min-w-0 bg-transparent font-mono leading-none tracking-[0.06em] text-[#313949] caret-[#8f422b] outline-none placeholder:text-[#7d8390]"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              onSearch(query);
            }
          }}
          autoComplete="off"
          spellCheck="false"
          autoFocus
        />
      </label>

      <button
        className="search-bar__submit group grid shrink-0 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_25%,#e3a082_0%,#c46f4c_52%,#a34c33_100%)] text-white shadow-[0_8px_18px_rgba(163,76,51,0.25)] transition-[transform,filter] duration-200 hover:scale-[1.04] hover:brightness-95 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#c46f4c]/20 motion-reduce:transition-none"
        type="submit"
        aria-label="Go to the matching portfolio section"
      >
        <ArrowRight
          className="h-6 w-6 transition-transform duration-200 group-hover:translate-x-[2px] motion-reduce:transition-none lg:h-7 lg:w-7"
          strokeWidth={1.8}
          aria-hidden="true"
        />
      </button>
    </form>
  );
}
