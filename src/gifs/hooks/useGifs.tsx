import { useState } from "react";
import type { Gif } from "../interfaces/gif.interface.ts";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action.ts";

const gifCache = new Map<string, Gif[]>();

function useGifs() {
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);
  const [gifs, setGifs] = useState<Gif[]>([]);

  const handleTermClicked = async (term: string) => {
    if (gifCache.has(term)) {
      setGifs(gifCache.get(term)!);
      return;
    }
    setGifs(await getGifsByQuery(term));
  };

  const handleSearch = async (query: string) => {
    query = query.toLowerCase().trim();

    if (query.length === 0) return;

    if (previousTerms.includes(query)) {
      return handleTermClicked(query);
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
    //actions
    handleSearch,
    handleTermClicked,
  };
}

export default useGifs;
