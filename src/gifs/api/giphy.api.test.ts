import { describe, expect, test } from "vitest";
import { giphyApi } from "./giphy.api.ts";

describe("Giphy API", () => {
  test("should be configured correctly", () => {
    const params = giphyApi.defaults.params;

    expect(giphyApi.defaults.baseURL).toBe("https://api.giphy.com/v1/gifs");

    expect(params).toStrictEqual({
      api_key: import.meta.env.VITE_GIPHY_API_KEY,
      lang: "es",
    });
  });
});
