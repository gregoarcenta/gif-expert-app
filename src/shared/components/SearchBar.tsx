import { useEffect, useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  currentQuery: string;
  onQuery: (query: string) => void;
}

function SearchBar({
  placeholder = "Buscar gifs",
  currentQuery,
  onQuery,
}: SearchBarProps) {
  const [query, setQuery] = useState(currentQuery);

  useEffect(() => {
    setQuery(currentQuery);
  }, [currentQuery]);

  useEffect(() => {
    const term = query.toLowerCase().trim();
    if (term.length === 0) return;

    const timeoutId = setTimeout(() => {
      onQuery(term);
    }, 700);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [onQuery, query]);

  const handleSearch = () => {
    onQuery(query);
    setQuery("");
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
