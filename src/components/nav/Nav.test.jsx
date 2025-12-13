import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { test, expect } from "vitest";
import User from "@testing-library/user-event";
import Nav from "./Nav";

test("renders nav component", () => {
  render(
    <MemoryRouter>
      <Nav />
    </MemoryRouter>
  );
  const linkElement = screen.getByText(/Reddit/i);
  expect(linkElement).toBeInTheDocument();
});

test("when user clicks Reddit link, they are taken to home page", () => {
  render(
    <MemoryRouter initialEntries={["/post/98776"]}>
      <Nav />
    </MemoryRouter>
  );
  const redditLink = screen.getByText("Reddit");
  User.click(redditLink);
  expect(window.location.pathname).toBe("/");
});
