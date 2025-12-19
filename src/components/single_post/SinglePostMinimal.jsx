import React from "react";
import { timeAgo } from "../../utils/util.js";
import RedditImage from "../reddit_image/RedditImage.jsx";
import { Link, useNavigate } from "react-router-dom";
import Upvotes from "../upvotes/Upvotes.jsx";
import { getProperSubId, getProperPostId } from "../../utils/util.js";
import PostMedia from "../post_media/PostMedia.jsx";

const SinglePostMinimal = (post) => {
  const navigate = useNavigate();

  const {
    id,
    title,
    thumbnail,
    subredditName,
    subreddit_name_prefixed,
    author,
    ups,
    timePosted,
    url_overridden_by_dest,
  } = post.post;
  console.log("SinglePostMinimal post:", post.post);
  let subredditNameFinal = "";
  if (subredditName) {
    subredditNameFinal = subredditName;
  }
  if (subreddit_name_prefixed) {
    subredditNameFinal = subreddit_name_prefixed;
  }
  const handlePostClick = () => {
    navigate(
      `/post/${getProperSubId(subredditNameFinal)}/${getProperPostId(id)}`
    );
  };
  return (
    <div className="p-2 w-full">
      <div
        className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 w-full max-w-full overflow-hidden hover:cursor-pointer"
        onClick={handlePostClick}
      >
        <div className="flex items-start mb-4 gap-4 pl-5 pt-5 mr-5 min-w-0">
          <img
            src={thumbnail}
            alt="Post Thumbnail"
            className="w-10 h-10 rounded-full border border-gray-300 bg-white p-0.5 shadow-sm flex-shrink-0"
          />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center min-w-0">
              <span className="ml-2 font-semibold break-words truncate max-w-full">
                <Link
                  to={`subreddit/${getProperSubId(subredditName)}`}
                  onClick={(e) => e.stopPropagation()}
                  className="block truncate"
                >
                  {subredditName}
                </Link>
              </span>
              <span className="mx-2 text-gray-400">·</span>
              <span className="text-gray-500 break-words truncate max-w-full">
                {timeAgo(timePosted)}
              </span>
            </div>

            <div className="flex flex-wrap items-center min-w-0">
              <span className="text-lg font-semibold break-words line-clamp-2 max-w-full">
                {title}
              </span>
              <span className="mx-2 text-gray-400">·</span>
              <span className="text-gray-500 break-words truncate max-w-full">
                {author}
              </span>
            </div>
          </div>
        </div>

        <div className="pl-5 pt-5 mr-5 max-w-full overflow-hidden">
          <PostMedia post={post.post} />
        </div>

        <div className="p-5 pl-15">
          <Upvotes upvotes={ups} />
        </div>
      </div>
    </div>
  );
};

export default SinglePostMinimal;
