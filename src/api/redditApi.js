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
  urlApiFetchSingleRedditPost: (sub, post_id) =>
    `${REDDIT_BASE_URL}/r/${sub}/comments/${post_id}.json`,
  urlApiFetchSubredditDetailsHot: (subredditName) =>
    `${REDDIT_BASE_URL}/r/${subredditName}.json?sort=hot`,
  urlApiFetchSubredditDetailsNew: (subredditName) =>
    `${REDDIT_BASE_URL}/r/${subredditName}.json?sort=new`,
  urlApiFetchSubredditDetailsTop: (subredditName) =>
    `${REDDIT_BASE_URL}/r/${subredditName}.json?sort=top`,
  urlApiLoadMoreSubredditPosts: (subredditName, after) =>
    `https://www.reddit.com/r/${subredditName}.json?after=${after}&limit=25`,
};

export const apiFetchPosts = async () => {
  const response = await fetch(urlapis.urlApiFetchPosts);
  if (!response.ok) throw new Error("Network error");
  const data = await response.json();
  return data;
};

export const apiFetchMorePostsNext = async (next) => {
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
  const response = await fetch(
    urlapis.urlApiFetchMoreSearchResults(query, after)
  );
  if (!response.ok) throw new Error("Network error");
  const data = await response.json();
  return data;
};

export const apiFetchSingleRedditPost = async (sub, post_id) => {
  const response = await fetch(
    urlapis.urlApiFetchSingleRedditPost(sub, post_id)
  );
  if (!response.ok) throw new Error("Network error");
  const data = await response.json();
  // Reddit JSON: [postInfo, commentsInfo]
  const post = data[0]?.data?.children?.[0]?.data;
  const comments =
    data[1]?.data?.children
      ?.filter((item) => item.kind === "t1")
      .map((item) => item.data) || [];
  return { post, comments };
};

export const apiFetchSubredditDetailsHot = async (subredditName) => {
  const response = await fetch(
    urlapis.urlApiFetchSubredditDetailsHot(subredditName)
  );
  if (!response.ok) throw new Error("Network error");
  const data = await response.json();
  return data;
};

export const apiFetchSubredditDetailsNew = async (subredditName) => {
  const response = await fetch(
    urlapis.urlApiFetchSubredditDetailsNew(subredditName)
  );
  if (!response.ok) throw new Error("Network error");
  const data = await response.json();
  return data;
};

export const apiFetchSubredditDetailsTop = async (subredditName) => {
  const response = await fetch(
    urlapis.urlApiFetchSubredditDetailsTop(subredditName)
  );
  if (!response.ok) throw new Error("Network error");
  const data = await response.json();
  return data;
};

export const apiLoadMoreSubredditPosts = async (subredditName, after) => {
  const response = await fetch(
    urlapis.urlApiLoadMoreSubredditPosts(subredditName, after)
  );
  if (!response.ok) throw new Error("Network error");
  const data = await response.json();
  return data;
};
