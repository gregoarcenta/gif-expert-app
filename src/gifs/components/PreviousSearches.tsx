interface PreviousSearchesProps {
  prevSearches: string[];
  onLabelClick: (term: string) => void;
}

function PreviousSearches({
  prevSearches,
  onLabelClick,
}: PreviousSearchesProps) {
  return (
    <div className={"previous-searches"}>
      <h2>Busquedas previas</h2>
      <ul className={"previous-searches-list"}>
        {prevSearches.map((term) => (
          <li key={term} onClick={() => onLabelClick(term)}>
            {term}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PreviousSearches;
