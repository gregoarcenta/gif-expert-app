import { describe, test } from "vitest";
import { render } from "@testing-library/react";
import GifsApp from "./GifsApp.tsx";

describe("GifsApp", () => {
  // test("should render component properly", () => {
  //   const { container } = render(<GifsApp />);
  //   expect(container).toMatchSnapshot();
  // });

  test("should render button element", () => {
    render(<GifsApp />);

    // screen.debug();

    // const btn = screen.getByRole("button", { name: "Search" });
    // expect(btn).toBeDefined();
  });
});
