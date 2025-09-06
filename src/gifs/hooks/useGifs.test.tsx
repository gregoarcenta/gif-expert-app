import { describe, expect, test, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import useGifs, { gifCache } from "./useGifs.tsx";
import * as gifsActions from "../actions/get-gifs-by-query.action.ts";
import { gifsMock } from "../../../tests/mocks/gifs.data.ts";

describe("useGifs", () => {
  test("should return default values and methods", () => {
    const { result } = renderHook(() => useGifs());

    expect(result.current.gifs).toHaveLength(0);
    expect(result.current.previousTerms).toHaveLength(0);
    expect(result.current.previousTermClicked).toBe("");
    expect(result.current.handleSearch).toBeDefined();
    expect(result.current.handleTermClicked).toBeDefined();
  });

  test("should return a list of gifs", async () => {
    vi.spyOn(gifsActions, "getGifsByQuery").mockResolvedValueOnce(gifsMock);

    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleSearch("goku");
    });

    expect(result.current.gifs).toHaveLength(gifsMock.length);
  });

  test("should set previousTermClicked to the clicked term", () => {
    const query = "goku";
    const { result } = renderHook(() => useGifs());

    act(() => {
      result.current.handleTermClicked(query);
    });

    expect(result.current.previousTermClicked).toBe(query);
  });

  test("should cache fetched gifs for a new term and avoid refetch on repeat", async () => {
    const spy = vi
      .spyOn(gifsActions, "getGifsByQuery")
      .mockResolvedValueOnce(gifsMock);

    vi.spyOn(gifCache, "get").mockImplementation(() => undefined);

    const { result } = renderHook(() => useGifs());
    const query = "goku";

    await act(async () => {
      await result.current.handleSearch(query);
    });

    vi.spyOn(gifCache, "get").mockImplementation(() => gifsMock);

    await act(async () => {
      await result.current.handleSearch(query);
    });

    expect(spy).toHaveBeenCalledExactlyOnceWith(query);
  });

  test("should return no more than 8 previous terms", async () => {
    const { result } = renderHook(() => useGifs());

    vi.spyOn(gifsActions, "getGifsByQuery").mockResolvedValue([]);
    vi.spyOn(gifCache, "get").mockImplementation(() => undefined);

    await act(async () => {
      await result.current.handleSearch("goku1");
    });
    await act(async () => {
      await result.current.handleSearch("goku2");
    });
    await act(async () => {
      await result.current.handleSearch("goku3");
    });
    await act(async () => {
      await result.current.handleSearch("goku4");
    });
    await act(async () => {
      await result.current.handleSearch("goku5");
    });
    await act(async () => {
      await result.current.handleSearch("goku6");
    });
    await act(async () => {
      await result.current.handleSearch("goku7");
    });
    await act(async () => {
      await result.current.handleSearch("goku8");
    });
    await act(async () => {
      await result.current.handleSearch("goku9");
    });

    expect(result.current.previousTerms.length).toBe(8);
    expect(result.current.previousTerms).toStrictEqual([
      "goku9",
      "goku8",
      "goku7",
      "goku6",
      "goku5",
      "goku4",
      "goku3",
      "goku2",
    ]);
  });
});
