import React from "react";
import { useEffect } from "react";
import { selectSelectedSubreddit } from "../side_bar_subreddit/sideBarSubRedditSlice.jsx";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { subredditPageSelector } from "../../features/subreddit_page/subredditPageSlice.js";
import { useDispatch } from "react-redux";
import { getProperSubId } from "../../utils/util.js";
import { sortByReducer } from "../../features/subreddit_page/subredditPageSlice.js";
import {
  fetchSubredditDetailsNew,
  fetchSubredditDetailsTop,
  fetchSubredditDetailsHot,
} from "../../features/subreddit_page/subredditPageSlice.js";

const SubredditHeader = () => {
  const selectedSubreddit = useSelector(selectSelectedSubreddit);
  const dispatch = useDispatch();
  const subredditPageState = useSelector(subredditPageSelector);
  const { sortBy } = subredditPageState;
  console.log("sortBy in SubredditHeader:", sortBy);
  console.log("SubredditPageState:", subredditPageState);
  console.log(
    "SelectedSubreddit in SubredditHeader:",
    getProperSubId(selectedSubreddit.display_name_prefixed)
  );
  const handleSort = (sortType) => {
    if (sortType === "hot") {
      dispatch(
        fetchSubredditDetailsHot(
          getProperSubId(selectedSubreddit.display_name_prefixed)
        )
      );
      dispatch(sortByReducer("hot"));
    } else if (sortType === "new") {
      dispatch(
        fetchSubredditDetailsNew(
          getProperSubId(selectedSubreddit.display_name_prefixed)
        )
      );
      dispatch(sortByReducer("new"));
    } else if (sortType === "top") {
      dispatch(
        fetchSubredditDetailsTop(
          getProperSubId(selectedSubreddit.display_name_prefixed)
        )
      );
      dispatch(sortByReducer("top"));
    }
  };
  useEffect(() => {
    // Reset sortBy to 'hot' when subreddit changes
    dispatch(
      fetchSubredditDetailsHot(
        getProperSubId(selectedSubreddit.display_name_prefixed)
      )
    );
    dispatch(sortByReducer("hot"));
  }, [dispatch, selectedSubreddit]);

  console.log("SubredditHeader selectedSubreddit:", selectedSubreddit);
  const { header_img, icon_img, display_name_prefixed } = selectedSubreddit;
  console.log("selected subreddit:", { selectedSubreddit });
  return (
    <div className="w-full">
      {/* Banner */}
      <div className="relative h-32 bg-gray-300">
        {header_img ? (
          <img
            src={header_img}
            alt="Subreddit banner"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-gray-400 to-gray-300" />
        )}
      </div>

      {/* Content */}
      <div className="bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-4 relative -top-8">
            {/* Icon */}
            <div className="shrink-0">
              {icon_img ? (
                <img
                  src={icon_img}
                  alt={display_name_prefixed}
                  className="w-20 h-20 rounded-full border-4 border-white bg-white object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-500">
                  r/
                </div>
              )}
            </div>

            {/* Name + actions */}
            <div className="pt-10 flex justify-between border-b border-gray-300 w-full pb-4">
              <h1 className="text-2xl font-bold">
                <Link
                  to={`/${display_name_prefixed}`}
                  className="hover:underline"
                >
                  {display_name_prefixed}
                </Link>
              </h1>

              <div className="mt-2 flex items-center gap-3">
                <button
                  className={`${
                    sortBy === "hot"
                      ? "bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full"
                      : "border border-gray-300 hover:bg-gray-100 text-sm font-semibold px-4 py-1.5 rounded-full"
                  } `}
                  onClick={() => {
                    handleSort("hot");
                  }}
                >
                  hot
                </button>

                <button
                  className={`${
                    sortBy === "new"
                      ? "bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full"
                      : "border border-gray-300 hover:bg-gray-100 text-sm font-semibold px-4 py-1.5 rounded-full"
                  }`}
                  onClick={() => {
                    handleSort("new");
                  }}
                >
                  new
                </button>
                <button
                  className={`${
                    sortBy === "top"
                      ? "bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full"
                      : "border border-gray-300 hover:bg-gray-100 text-sm font-semibold px-4 py-1.5 rounded-full"
                  }`}
                  onClick={() => {
                    handleSort("top");
                  }}
                >
                  top
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubredditHeader;
