import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularSubreddits } from "./sideBarSubRedditSlice";
import { useEffect } from "react";
import {
  selectSubreddits,
  selectIsLoadingSubreddits,
  selectErrorSubreddits,
} from "./sideBarSubRedditSlice";
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
      </div>
    );
  }

  return (
    <div className="w-2/4 p-4 border border-gray-300 rounded-lg bg-white">
      <h2 className="text-lg font-semibold mb-4">About Community</h2>
    </div>
  );
};

export default SideBarSubReddit;
