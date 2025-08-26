import { useCallback, useState } from "react";
import type { Gif } from "../interfaces/gif.interface.ts";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action.ts";

const gifCache = new Map<string, Gif[]>();

function useGifs() {
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [currentQuery, setCurrentQuery] = useState<string>("");

  const handleTermClicked = async (term: string) => {
    setCurrentQuery(term);
    const cached = gifCache.get(term);

    if (!cached) return setGifs(await getGifsByQuery(term));
    if (JSON.stringify(gifs) === JSON.stringify(cached)) {
      // console.log("ya esta en pantalla");
      return;
    }

    setGifs(gifCache.get(term)!);
    // console.log("cache");
  };

  const handleSearch = useCallback(
    async (query: string) => {
      // console.log("handleSearch", query);

      if (previousTerms.includes(query)) {
        return handleTermClicked(query);
      }

      setPreviousTerms([query, ...previousTerms.slice(0, 7)]);

      const gifs = await getGifsByQuery(query);

      setGifs(gifs);
      gifCache.set(query, gifs);
    },
    [previousTerms],
  );

  return {
    //state
    gifs,
    previousTerms,
    currentQuery,
    //actions
    handleSearch,
    handleTermClicked,
  };
}

export default useGifs;
