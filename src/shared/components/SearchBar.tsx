import { useEffect, useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  onQuery: (query: string) => void;
}

function SearchBar({ placeholder = "Buscar gifs", onQuery }: SearchBarProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onQuery(query);
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
