import React from "react";

const SinglePostMinimal = (post) => {
  const {
    id,
    title,
    thumbnail,
    subreddit_id,
    subredditName,
    author,
    upvotes,
    timePosted,
  } = post.post;
  return (
    <div>
      <ul>
        <li>{id}</li>
        <li>{title}</li>
        <li>{thumbnail}</li>
        <li>{subreddit_id}</li>
        <li>{subredditName}</li>
        <li>{author}</li>
        <li>{upvotes}</li>
        <li>{timePosted}</li>
      </ul>
    </div>
  );
};

export default SinglePostMinimal;
