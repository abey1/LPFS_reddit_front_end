import React from "react";
import { fetchComments } from "./commentsSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  commentsSelector,
  isLoadingCommentsSelector,
  errorCommentsSelector,
} from "./commentsSlice";
import CommentItem from "./CommentItem";

const Comments = ({ sub, post_id }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(fetchComments({ sub, post_id }))
    dispatch(fetchComments({ sub, post_id }));
  }, [dispatch, sub, post_id]);

  const comments = useSelector(commentsSelector);
  const isLoading = useSelector(isLoadingCommentsSelector);
  const error = useSelector(errorCommentsSelector);

  if (isLoading) {
    return (
      <div>
        <p>Loading comments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default Comments;
