import React from "react";
import { timeAgo } from "../../utils/util.js";
import RedditImage from "../reddit_image/RedditImage.jsx";
import { useNavigate } from "react-router-dom";

const SinglePostMinimal = (post) => {
  const navigate = useNavigate();
  const getProperSub = (sub) => {
    return sub.replace(/^r\//, "");
  };
  const getPropId = (id) => {
    return id.replace(/^t3_/, "");
  };
  const {
    id,
    title,
    thumbnail,
    subreddit_id,
    subredditName,
    author,
    upvotes,
    timePosted,
    url_overridden_by_dest,
  } = post.post;
  const handlePostClick = () => {
    navigate(`/post/${getProperSub(subredditName)}/${getPropId(id)}`);
  };
  return (
    <div
      className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow duration-300 max-w-full w-full hover:cursor-pointer"
      onClick={handlePostClick}
    >
      <div className="flex items-center mb-4 gap-4">
        <img
          src={thumbnail}
          alt="Post Thumbnail"
          className="w-10 h-10 rounded-full border bg-white p-0.5 shadow-sm"
        />
        <div>
          <div className="flex flex-wrap">
            <span className="ml-2 font-semibold wrap-break-word inline-block shrink min-w-0">
              {subredditName}
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
      <div>
        <RedditImage src={url_overridden_by_dest} alt={title} />
      </div>
      <ul>
        <li>{id}</li>
        <li>{title}</li>
        <li>{thumbnail}</li>
        <li>{subreddit_id}</li>
        <li>{subredditName}</li>
        <li>{author}</li>
        <li>{upvotes}</li>
        <li>{timePosted}</li>
        <li>{url_overridden_by_dest}</li>
        <li>{timeAgo(timePosted)}</li>
      </ul>
    </div>
  );
};

export default SinglePostMinimal;
