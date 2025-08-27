import { useEffect, useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  previousQuery: string;
  onQuery: (query: string) => void;
}

function SearchBar({
  placeholder = "Buscar gifs",
  previousQuery,
  onQuery,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [debounceDelay, setDebounceDelay] = useState(700);

  useEffect(() => {
    setQuery(previousQuery);
    if (previousQuery.length > 0) setDebounceDelay(0);
  }, [previousQuery]);

  useEffect(() => {
    const term = query.toLowerCase().trim();
    if (term.length === 0) return;

    const timeoutId = setTimeout(() => {
      onQuery(term);
      setDebounceDelay(700);
    }, debounceDelay);

    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const handleSearch = () => {
    onQuery(query);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
}

export default SearchBar;
