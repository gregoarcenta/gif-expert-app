import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SearchBar from "./SearchBar.tsx";

describe("SearchBar", () => {
  test("should render searchBar correctly", () => {
    const onQuery = vi.fn();
    const { container } = render(
      <SearchBar previousQuery={""} onQuery={onQuery} />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should call onQuery with the correct value after 700ms", async () => {
    const onQuery = vi.fn();
    render(<SearchBar previousQuery={""} onQuery={onQuery} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });

    await waitFor(() => {
      expect(onQuery).toHaveBeenCalledExactlyOnceWith("test");
    });
  });

  test("should call only once with the last value (debounce)", async () => {
    const onQuery = vi.fn();
    render(<SearchBar previousQuery={""} onQuery={onQuery} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "t" } });
    fireEvent.change(input, { target: { value: "te" } });
    fireEvent.change(input, { target: { value: "tes" } });
    fireEvent.change(input, { target: { value: "test" } });

    await waitFor(() => {
      expect(onQuery).toHaveBeenCalledExactlyOnceWith("test");
    });
  });

  test("should call onQuery when the button clicked with the input value", () => {
    const onQuery = vi.fn();
    render(<SearchBar previousQuery={""} onQuery={onQuery} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(onQuery).toHaveBeenCalledExactlyOnceWith("test");
  });

  test("should the input has  the correct placeholder value", () => {
    const value = "Busca los mejores gifs";
    render(
      <SearchBar
        previousQuery={"previousQuery"}
        onQuery={() => {}}
        placeholder={value}
      />,
    );
    expect(screen.getByPlaceholderText(value)).toBeDefined();
  });

  test("should call to onQuery when previousQuery is not empty", async () => {
    const onQuery = vi.fn();
    const newQuery = "test previousQuery";

    const { rerender } = render(
      <SearchBar previousQuery="" onQuery={onQuery} />,
    );

    expect(onQuery).not.toHaveBeenCalled();

    rerender(<SearchBar previousQuery={newQuery} onQuery={onQuery} />);

    await waitFor(() =>
      expect(onQuery).toHaveBeenCalledExactlyOnceWith(newQuery.toLowerCase()),
    );
  });
});
