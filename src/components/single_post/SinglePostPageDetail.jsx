import React from "react";

const SinglePostPageDetail = ({ post }) => {
  console.log("SinglePostPageDetail post:", post);
  return (
    <div>
      <h2>{post.title}</h2>

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
      )}
    </div>
  );
};

export default SinglePostPageDetail;
