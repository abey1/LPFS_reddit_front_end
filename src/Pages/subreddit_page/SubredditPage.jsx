import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../components/back_button/BackButton";
import SubredditHeader from "../../components/subreddit_header/SubredditHeader.jsx";
import { subredditPageSelector } from "../../features/subreddit_page/subredditPageSlice.js";
import { useSelector } from "react-redux";
import { LoadMoreSubredditPosts } from "../../features/subreddit_page/subredditPageSlice.js";
import { trimSubredditList } from "../../features/subreddit_page/subredditPageSlice.js";
import SinglePostMinimal from "../../components/single_post/SinglePostMinimal.jsx";
import LoadMoreButton from "../../components/load_more/LoadMoreButton.jsx";

const SubredditPage = () => {
  const subredditPageState = useSelector(subredditPageSelector);
  const {
    sortBy,
    newPosts,
    top,
    hot,
    pending,
    error,
    isLoadingMorePosts,
    errorLoadMore,
  } = subredditPageState;
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
      <div className=" w-full md:w-4/5 ">
        <SubredditHeader props={subreddit_id} />
      </div>

      {pending ? (
        <p>Loading posts...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className=" w-full md:w-4/5 ">
          {postsToRender.map((post) => (
            <SinglePostMinimal key={post.id} post={post} />
          ))}
          {isLoadingMorePosts ? (
            <p>Loading more posts...</p>
          ) : (
            <>
              <LoadMoreButton
                prop={{
                  loadMorePosts: () => LoadMoreSubredditPosts(subreddit_id),
                  trimList: () => trimSubredditList(),
                  error: errorLoadMore,
                }}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SubredditPage;
