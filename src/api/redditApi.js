import { REDDIT_BASE_URL } from "./redditBaseUrl";

const urlapis = {
  urlApiFetchPosts: `${REDDIT_BASE_URL}/.json`,
  urlApiFetchMorePostsNext: (next) =>
    `${REDDIT_BASE_URL}/.json?after=${next}&limit=25`,
  urlApiFetchSearchResults: (query) =>
    `${REDDIT_BASE_URL}/search.json?q=${encodeURIComponent(query)}&limit=25`,
  urlApiFetchMoreSearchResults: (query, after) =>
    `${REDDIT_BASE_URL}/search.json?q=${encodeURIComponent(
      query
    )}&after=${after}&limit=25`,
};

export const apiFetchPosts = async () => {
  const response = await fetch(urlapis.urlApiFetchPosts);
  if (!response.ok) throw new Error("Network error");
  const data = await response.json();
  return data;
};

export const apiFetchMorePostsNext = async (next) => {
  if (!next) return;
  const response = await fetch(urlapis.urlApiFetchMorePostsNext(next));
  if (!response.ok) throw new Error("Network error");
  const data = await response.json();
  return data;
};

export const apiFetchSearchResults = async (query) => {
  const response = await fetch(urlapis.urlApiFetchSearchResults(query));
  if (!response.ok) throw new Error("Network error");
  const data = await response.json();
  return data;
};

export const apiFetchMoreSearchResults = async (query, after) => {
  if (!after) return;
  const response = await fetch(
    urlapis.urlApiFetchMoreSearchResults(query, after)
  );
  if (!response.ok) throw new Error("Network error");
  const data = await response.json();
  return data;
};
