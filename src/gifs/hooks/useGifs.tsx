import { useCallback, useState } from "react";
import type { Gif } from "../interfaces/gif.interface.ts";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action.ts";

export const gifCache = new Map<string, Gif[]>();

function useGifs() {
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousTermClicked, setPreviousTermClicked] = useState<string>("");

  const handleTermClicked = (term: string) => {
    setPreviousTermClicked(term);
  };

  const handleSearch = useCallback(
    async (query: string) => {
      const cached = gifCache.get(query);

      if (cached) return setGifs(cached);

      const gifs = await getGifsByQuery(query);

      setPreviousTerms([query, ...previousTerms.slice(0, 7)]);
      setGifs(gifs);

      gifCache.set(query, gifs);
    },
    [previousTerms],
  );

  return {
    //state
    gifs,
    previousTerms,
    previousTermClicked,
    //actions
    handleSearch,
    handleTermClicked,
  };
}

export default useGifs;
