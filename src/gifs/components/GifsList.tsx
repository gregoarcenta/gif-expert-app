import type { Gif } from "../interfaces/gif.interface.ts";

interface GifsListProps {
  gifs: Gif[];
}

function GifsList({ gifs }: GifsListProps) {
  return (
    <>
      {gifs.map((gif) => (
        <div key={gif.id} className={"gif-card"}>
          <img src={gif.url} alt={gif.title} />
        </div>
      ))}
    </>
  );
}

export default GifsList;
