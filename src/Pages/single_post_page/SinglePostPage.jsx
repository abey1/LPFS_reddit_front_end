import React from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../components/back_button/BackButton";
const SinglePostPage = () => {
  const { sub, post_id } = useParams();

  return (
    <div>
      <BackButton />
      <h1>{`Single post page: ${post_id} and sub is ${sub}`}</h1>
      <h2>{`https://www.reddit.com/r/${sub}/comments/${post_id}.json`}</h2>
      <p></p>
    </div>
  );
};

export default SinglePostPage;
