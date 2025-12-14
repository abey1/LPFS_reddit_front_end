import React from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../components/back_button/BackButton";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { singlePostSelector } from "./singePostPageSlice.js";
import { useSelector } from "react-redux";
import { fetchSingleRedditPost } from "./singePostPageSlice.js";

const SinglePostPage = () => {
  const { sub, post_id } = useParams();
  console.log("SinglePostPage params:", { sub, post_id });
  const dispatch = useDispatch();
  const { loading, error, post, comments } = useSelector(singlePostSelector);
  useEffect(() => {
    // Fetch the single post data using sub and post_id
    // Example: dispatch(fetchSinglePost(sub, post_id));
    dispatch(fetchSingleRedditPost({ sub, post_id }));
  }, [sub, post_id]);
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
