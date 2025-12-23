import React from "react";
import { useDispatch } from "react-redux";

const LoadMoreButton = ({ prop }) => {
  const { loadMorePosts, trimList, error } = prop;
  const dispatch = useDispatch();
  const handleLoadMore = () => {
    dispatch(loadMorePosts());
    if (trimList) dispatch(trimList());
  };
  return (
    <div className="flex justify-center">
      <button
        className=" w-full mt-6 px-6 py-2 rounded-full bg-[#FF4500] text-white font-semibold text-sm shadow-sm hover:bg-[#e03d00] active:bg-[#c93400] transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleLoadMore}
      >
        {error ? "Try Again" : "Load More"}
      </button>
    </div>
  );
};

export default LoadMoreButton;
