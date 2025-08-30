import { beforeEach, describe, expect, test, vi } from "vitest";
import AxiosMockAdapter from "axios-mock-adapter";

import { getGifsByQuery } from "./get-gifs-by-query.action.ts";
import { giphyApi } from "../api/giphy.api.ts";
import { giphyResponseMock } from "../../../tests/mocks/giphy.response.data.ts";

describe("getGifsByQuery", () => {
  const mock = new AxiosMockAdapter(giphyApi);

  beforeEach(() => {
    mock.reset();
  });

  // test ("returns 10 GIFs matching the query with expected shape", async () => {
  //   const gifs = await getGifsByQuery("goku");
  //   const [gif1] = gifs;
  //
  //   expect(gifs.length).toBe(10);
  //   expect(gif1).toStrictEqual({
  //     id: expect.any(String),
  //     height: expect.any(Number),
  //     title: expect.any(String),
  //     url: expect.any(String),
  //     width: expect.any(Number),
  //   });
  // });

  test("should return a list of gifs", async () => {
    mock.onGet("/search").reply(200, giphyResponseMock);

    const gifs = await getGifsByQuery("goku");

    expect(gifs.length).toBe(10);

    gifs.forEach((gif) => {
      expect(typeof gif.id).toBe("string");
      expect(typeof gif.title).toBe("string");
      expect(typeof gif.url).toBe("string");
      expect(typeof gif.height).toBe("number");
      expect(typeof gif.width).toBe("number");
    });
  });

  test("should return an empty list of gifts if query is empty", async () => {
    // mock.restore();// waring: restore() devuelve axios a su estado original, haciendo peticiones a la API real

    const gifs = await getGifsByQuery("");

    expect(gifs.length).toBe(0);
  });

  test("should handle error when the API returns an error", async () => {
    mock.onGet("/search").reply(400, {
      data: {
        message: "Bad Request",
      },
    });

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const gifs = await getGifsByQuery("goku");

    expect(gifs.length).toBe(0);
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledOnce();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.any(String),
      expect.anything(),
    );
  });
});
