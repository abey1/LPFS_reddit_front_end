import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularSubreddits } from "./sideBarSubRedditSlice";
import { useEffect } from "react";
import {
  selectSubreddits,
  selectIsLoadingSubreddits,
  selectErrorSubreddits,
} from "./sideBarSubRedditSlice";
import SideBarSinglePopularReddit from "./SideBarSinglePopularReddit";
const SideBarSubReddit = () => {
  const dispatch = useDispatch();
  const subreddits = useSelector(selectSubreddits);
  const isLoading = useSelector(selectIsLoadingSubreddits);
  const error = useSelector(selectErrorSubreddits);

  useEffect(() => {
    dispatch(fetchPopularSubreddits());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div>
        <p>Loading post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={() => dispatch(fetchPopularSubreddits())}>
          try again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full p-4 h-full border-gray-600 rounded-lg bg-gray-200 overflow-auto">
      {subreddits.map((subreddit, index) => (
        <div key={subreddit.id} className="mb-4">
          <SideBarSinglePopularReddit subreddit={subreddit} index={index} />
        </div>
      ))}
    </div>
  );
};

export default SideBarSubReddit;
