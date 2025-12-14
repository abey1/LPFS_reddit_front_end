import React from "react";
import { render, screen } from "@testing-library/react";
import { expect, afterEach } from "vitest";
import { jest } from "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import * as reactRedux from "react-redux";
import HomePage from "./HomePage";
import * as homeSlice from "./homePageSlice";

// Mock the child component so we can assert easily
jest.mock("../../components/single_post/SinglePostMinimal.jsx", () => {
  return {
    __esModule: true,
    default: ({ post }) => <div data-testid="post">{post.title}</div>,
  };
});

// Mock the slice module (fetchPosts + selectors)
jest.mock("./homePageSlice", () => ({
  __esModule: true,
  fetchPosts: jest.fn(),
  postSelector: jest.fn(),
  isLoadingSelector: jest.fn(),
  errorSelector: jest.fn(),
}));

afterEach(() => {
  jest.restoreAllMocks();
});

test("renders posts from mocked selector and dispatches fetchPosts", () => {
  const mockPosts = [
    { id: 1, title: "Post 1" },
    { id: 2, title: "Post 2" },
  ];

  // Spy on useDispatch and useSelector
  const dispatchMock = jest.fn();
  jest.spyOn(reactRedux, "useDispatch").mockReturnValue(dispatchMock);

  // useSelector is called three times in this component in this order:
  // posts = useSelector(postSelector);
  // isLoading = useSelector(isLoadingSelector);
  // error = useSelector(errorSelector);
  jest
    .spyOn(reactRedux, "useSelector")
    .mockImplementationOnce(() => mockPosts) // posts
    .mockImplementationOnce(() => false) // isLoading
    .mockImplementationOnce(() => null); // error

  // Ensure fetchPosts returns a plain action so dispatch can be asserted
  homeSlice.fetchPosts.mockReturnValue({ type: "home/fetchPosts/mock" });

  render(<HomePage />);

  // Assert our mocked SinglePostMinimal rendered the posts
  const renderedPosts = screen.getAllByTestId("post");
  expect(renderedPosts).toHaveLength(2);
  expect(renderedPosts[0]).toHaveTextContent("Post 1");
  expect(renderedPosts[1]).toHaveTextContent("Post 2");

  // Assert fetchPosts was called and its result dispatched
  expect(homeSlice.fetchPosts).toHaveBeenCalled();
  expect(dispatchMock).toHaveBeenCalledWith({ type: "home/fetchPosts/mock" });
});
