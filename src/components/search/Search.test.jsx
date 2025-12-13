import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { test, expect } from "vitest";
import User from "@testing-library/user-event";
import Search from "./Search";

test("renders search component", () => {
  render(
    <MemoryRouter>
      <Search />
    </MemoryRouter>
  );
  const inputElement = screen.getByPlaceholderText(/Search Reddit/i);
  expect(inputElement).toBeInTheDocument();
});

test("when user searches with empty string it redirects to home", () => {
  render(
    <MemoryRouter initialEntries={["/subreddit/javascript"]}>
      <Search />
    </MemoryRouter>
  );
  const inputElement = screen.getByPlaceholderText(/Search Reddit/i);
  User.type(inputElement, "{enter}");
  expect(window.location.pathname).toBe("/");
});
