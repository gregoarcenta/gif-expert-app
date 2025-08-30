import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import CustomHeader from "./CustomHeader.tsx";

describe("CustomHeader", () => {
  const title = "Example title";
  const description = "Example description";

  test("should render the title correctly", () => {
    render(<CustomHeader title={title} />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(title);
  });

  test("should render the description when provided", () => {
    render(<CustomHeader title={title} description={description} />);
    expect(screen.getByRole("paragraph").textContent).toBe(description);
  });

  test("should not render the description when not provided", () => {
    const { container } = render(<CustomHeader title={title} />);
    expect(container.querySelector("p")).toBeNull();
  });
});
