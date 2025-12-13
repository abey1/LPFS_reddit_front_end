import React from "react";
import { useParams } from "react-router-dom";
const SinglePostPage = () => {
  const { post_id } = useParams();

  return (
    <div>
      <h1>{`Single post page: ${post_id}`}</h1>
    </div>
  );
};

export default SinglePostPage;
