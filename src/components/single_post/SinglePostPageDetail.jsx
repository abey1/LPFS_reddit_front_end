import React from "react";
import { timeAgo } from "../../utils/util.js";
import reddit_img from "../../../public/reddit.svg";
import RedditImage from "../reddit_image/RedditImage.jsx";
import Upvotes from "../upvotes/Upvotes.jsx";
const SinglePostPageDetail = ({ post }) => {
  const {
    author,
    body,
    commentsCount,
    createdAt,
    image,
    link,
    subreddit,
    title,
    upvotes,
    video,
  } = post;
  console.log("SinglePostPageDetail post:", post);
  return (
    <div className="p-2">
      <div className="bg-white rounded-2xl shadow-md  hover:shadow-lg transition-shadow duration-300 w-full hover:cursor-pointer border">
        <div className="flex items-center mb-4 gap-4 pl-5 pt-5">
          <img
            src={reddit_img}
            alt="Post Thumbnail"
            className="w-10 h-10 rounded-full border bg-white p-0.5 shadow-sm"
          />
          <div>
            <div className="flex flex-wrap">
              <span className="ml-2 font-semibold wrap-break-word inline-block shrink min-w-0">
                {subreddit}
              </span>{" "}
              ·{""}
              <span className="text-gray-500 ml-2 wrap-break-word inline-block shrink min-w-0">
                {timeAgo(createdAt)}
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
          <RedditImage src={image} alt={title} />
        </div>
        <div className="p-5">
          <p>{body}</p>
        </div>
        <div className="px-5 pb-5">
          <Upvotes upvotes={upvotes} />
        </div>
      </div>
    </div>
  );
};

export default SinglePostPageDetail;

{
  /* <h2>{post.title}</h2>

      <div>
        {post.subreddit_name_prefixed} · Posted by u/{post.author}
      </div>

      <div>
        {post.ups} upvotes · {post.num_comments} comments
      </div>

      {post.selftext && <p>{post.selftext}</p>}

      {post.post_hint === "image" && (
        <img
          src={post.preview.images[0].source.url.replace(/&amp;/g, "&")}
          alt="post"
          style={{ maxWidth: "100%" }}
        />
      )}

      {post.is_video && (
        <video
          src={post.media.reddit_video.fallback_url}
          controls
          style={{ maxWidth: "100%" }}
        />
      )}

      {post.post_hint === "link" && (
        <a href={post.url} target="_blank" rel="noopener noreferrer">
          {post.url}
        </a>
      )} */
}
