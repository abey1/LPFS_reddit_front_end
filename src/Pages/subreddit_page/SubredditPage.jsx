import React from "react";
import { useParams } from "react-router-dom";
const SubredditPage = () => {
  const { subreddit_id } = useParams();
  return (
    <div>
      <h1>{`Subreddit page: ${subreddit_id}`}</h1>
    </div>
  );
};

export default SubredditPage;
