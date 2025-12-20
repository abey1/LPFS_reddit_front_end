import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMorePosts } from "./loadMoreSlice.js";
import { isLoadingMoreSelector } from "./loadMoreSlice.js";

const LoadMore = ({ prop }) => {
  const { url } = prop;
  console.log("LoadMore component received url:", url);
  const dispatch = useDispatch();
  const isLoadingMore = useSelector(isLoadingMoreSelector);

  const handleLoadMore = () => {
    console.log("Load More button clicked. Dispatching fetchMorePosts...");
    dispatch(fetchMorePosts(url));
  };

  if (isLoadingMore) {
    return <div>Loading more posts...</div>;
  }

  return (
    <div className="flex justify-center">
      <button
        className=" w-full mt-6 px-6 py-2 rounded-full bg-[#FF4500] text-white font-semibold text-sm shadow-sm hover:bg-[#e03d00] active:bg-[#c93400] transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleLoadMore}
      >
        Load more
      </button>
    </div>
  );
};

export default LoadMore;
