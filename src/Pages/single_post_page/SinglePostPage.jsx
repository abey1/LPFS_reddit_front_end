import React from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../components/back_button/BackButton";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { singlePostSelector } from "./singePostPageSlice.js";
import { useSelector } from "react-redux";
import { fetchSingleRedditPost } from "./singePostPageSlice.js";
import SinglePostPageDetail from "../../components/single_post/SinglePostPageDetail.jsx";
import Comments from "../../components/comments/Comments.jsx";

const SinglePostPage = () => {
  const { sub, post_id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, post } = useSelector(singlePostSelector);

  useEffect(() => {
    dispatch(fetchSingleRedditPost({ sub, post_id }));
  }, [dispatch, sub, post_id]);

  if (loading) {
    return (
      <div>
        <BackButton />
        <p>Loading post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <BackButton />
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div>
        <BackButton />
        <p>No post found.</p>
      </div>
    );
  }

  return (
    <div>
      <BackButton />
      <SinglePostPageDetail post={post} />
      <Comments sub={sub} post_id={post_id} />
    </div>
  );
};

// const SinglePostPage = () => {
//   const { sub, post_id } = useParams();
//   console.log("SinglePostPage params:", { sub, post_id });
//   const dispatch = useDispatch();
//   const { loading, error, post, comments } = useSelector(singlePostSelector);
//   console.log("SinglePostPage state:", { loading, error, post, comments });
//   useEffect(() => {
//     // Fetch the single post data using sub and post_id
//     // Example: dispatch(fetchSinglePost(sub, post_id));
//     dispatch(fetchSingleRedditPost({ sub, post_id }));
//   }, [dispatch, sub, post_id]);
//   return (
//     <div>
//       <BackButton />
//       <SinglePostPageDetail post={post} />
//       <h1>{`Single post page: ${post_id} and sub is ${sub}`}</h1>
//       <h2>{`https://www.reddit.com/r/${sub}/comments/${post_id}.json`}</h2>
//       <p></p>
//     </div>
//   );
// };

export default SinglePostPage;
