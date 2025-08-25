import CustomHeader from "./shared/components/CustomHeader.tsx";
import SearchBar from "./shared/components/SearchBar.tsx";
import PreviousSearches from "./gifs/components/PreviousSearches.tsx";
import GifsList from "./gifs/components/GifsList.tsx";
import { useState } from "react";
import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query.action.ts";
import type { Gif } from "./gifs/interfaces/gif.interface.ts";

function GifsApp() {
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);
  const [gifs, setGifs] = useState<Gif[]>([]);

  const handleTermClicked = (term: string) => {
    console.log({ term });
  };

  const handleSearch = async (query: string) => {
    query = query.toLowerCase().trim();

    if (query.length === 0) return;

    if (previousTerms.includes(query)) return;

    setPreviousTerms([query, ...previousTerms.slice(0, 7)]);

    const gifs = await getGifsByQuery(query);
    setGifs(gifs);
  };

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
