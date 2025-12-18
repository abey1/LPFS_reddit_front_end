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
    upvotes,
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
    <div className="p-2">
      <div
        className="bg-white rounded-2xl shadow-md  hover:shadow-lg transition-shadow duration-300 w-full hover:cursor-pointer "
        onClick={handlePostClick}
      >
        <div className="flex items-center mb-4 gap-4 pl-5 pt-5 mr-10">
          <img
            src={thumbnail}
            alt="Post Thumbnail"
            className="w-10 h-10 rounded-full border border-gray-300 bg-white p-0.5 shadow-sm"
          />
          <div>
            <div className="flex flex-wrap">
              <span className="ml-2 font-semibold wrap-break-word inline-block shrink min-w-0">
                <Link
                  to={`subreddit/${getProperSubId(subredditName)}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {subredditName}
                </Link>
              </span>{" "}
              ·{""}
              <span className="text-gray-500 ml-2 wrap-break-word inline-block shrink min-w-0">
                {timeAgo(timePosted)}
              </span>
            </div>
            <div className="flex flex-wrap items-center">
              <span className="text-lg font-semibold shrink min-w-0">
                {title}
              </span>{" "}
              ·{" "}
              <span className="text-gray-500 wrap-break-word inline-block shrink min-w-0">
                {author}{" "}
              </span>
            </div>
          </div>
        </div>
        <div className="pl-5 pt-5">
          {/* <RedditImage src={url_overridden_by_dest} alt={title} /> */}
          <PostMedia post={post.post} />
        </div>
        <div className="p-5 pl-15">
          <Upvotes upvotes={upvotes} />
        </div>
      </div>
    </div>
  );
};

export default SinglePostMinimal;
