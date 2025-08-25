import CustomHeader from "./shared/components/CustomHeader.tsx";
import SearchBar from "./shared/components/SearchBar.tsx";
import PreviousSearches from "./gifs/components/PreviousSearches.tsx";
import GifsList from "./gifs/components/GifsList.tsx";
import useGifs from "./gifs/hooks/useGifs.tsx";

function GifsApp() {
  const { gifs, previousTerms, handleSearch, handleTermClicked } = useGifs();

  return (
    <>
      {/*Header*/}
      <CustomHeader
        title={"Buscador de Gifs"}
        description={"Descubre y comparte el gif perfecto"}
      />

      {/*search*/}
      <SearchBar placeholder={"Busca lo que quieras"} onQuery={handleSearch} />

      {/*busquedas previas*/}
      <PreviousSearches
        prevSearches={previousTerms}
        onLabelClick={handleTermClicked}
      />

      {/*Gifs*/}
      <div className={"gifs-container"}>
        <GifsList gifs={gifs} />
      </div>
    </>
  );
}

export default GifsApp;
