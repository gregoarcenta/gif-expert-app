import { useState } from "react";
import type { Gif } from "../interfaces/gif.interface.ts";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action.ts";

const gifCache = new Map<string, Gif[]>();

function useGifs() {
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousTermClicked, setPreviousTermClicked] = useState<string>("");

  const getCachedGifs = async (term: string) => {
    const cached = gifCache.get(term);

    if (!cached) return setGifs(await getGifsByQuery(term));

    if (JSON.stringify(gifs) === JSON.stringify(cached)) return;

    setGifs(gifCache.get(term)!);
  };

  const handleTermClicked = (term: string) => {
    setPreviousTermClicked(term);
  };

  const handleSearch = async (query: string) => {
    if (previousTerms.includes(query)) {
      return getCachedGifs(query);
    }

    setPreviousTerms([query, ...previousTerms.slice(0, 7)]);

    const gifs = await getGifsByQuery(query);

    setGifs(gifs);
    gifCache.set(query, gifs);
  };

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
