import React from "react";
import { Link } from "react-router-dom";
import { setSelectedSubreddit } from "./sideBarSubRedditSlice.jsx";
import { useDispatch } from "react-redux";
const SideBarSinglePopularReddit = ({ subreddit, index }) => {
  const dispatch = useDispatch();
  const {
    id,
    display_name_prefixed,
    description,
    community_icon,
    icon_img,
    header_img,
    subscribers,
  } = subreddit;

  const icon =
    community_icon?.split("?")[0] ||
    icon_img?.split("?")[0] ||
    header_img ||
    null;

  return (
    <Link
      to={`/subreddit/${id}`}
      onClick={() => dispatch(setSelectedSubreddit(index))}
    >
      <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-5 cursor-pointer">
        {/* Header */}
        <div className="flex items-center gap-4 mb-3">
          {icon ? (
            <img
              src={icon}
              alt={display_name_prefixed}
              className="w-12 h-12 rounded-full object-cover border"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
              r/
            </div>
          )}

          <div>
            <h2 className="text-lg font-semibold">{display_name_prefixed}</h2>
            <p className="text-sm text-gray-500">
              {subscribers?.toLocaleString()} members
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm line-clamp-3">
          {description || "No description available."}
        </p>
      </div>
    </Link>
  );
};

export default SideBarSinglePopularReddit;
