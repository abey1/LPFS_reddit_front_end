import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../components/back_button/BackButton";
import SubredditHeader from "../../components/subreddit_header/SubredditHeader.jsx";
import { subredditPageSelector } from "./subredditPageSlice.js";
import { useSelector } from "react-redux";
import TypicalRedditPost from "../../components/single_post/TypicalRedditPost.jsx";
import SinglePostMinimal from "../../components/single_post/SinglePostMinimal.jsx";

const SubredditPage = () => {
  const subredditPageState = useSelector(subredditPageSelector);
  const { sortBy, newPosts, top, hot } = subredditPageState;
  let postsToRender = [];
  if (sortBy === "new") {
    postsToRender = newPosts;
  } else if (sortBy === "top") {
    postsToRender = top;
  } else {
    postsToRender = hot;
  }
  const { subreddit_id } = useParams();
  return (
    <div className="">
      <BackButton />

      <SubredditHeader props={subreddit_id} />
      <div className="overflow-auto">
        {postsToRender.map((post) => (
          // <TypicalRedditPost key={post.id} post={post} />
          <SinglePostMinimal key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default SubredditPage;
