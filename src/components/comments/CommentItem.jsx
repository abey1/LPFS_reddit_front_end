import React from "react";

const CommentItem = ({ comment }) => {
  const { author, body, score, created_utc, replies, depth } = comment;

  // Extract reply comments safely
  const replyComments =
    replies?.data?.children
      ?.filter((item) => item.kind === "t1")
      .map((item) => item.data) || [];
  return (
    <div
      style={{ marginLeft: depth * 16 }}
      className="border-l border-gray-300 pl-3"
    >
      {/* Comment header */}
      <div className="text-sm text-gray-600">
        <span className="font-semibold">{author}</span>
        <span className="ml-2">⬆ {score}</span>
      </div>

      {/* Comment body */}
      <p className="mt-1 text-gray-900">{body}</p>

      {/* Replies (recursive call) */}
      {replyComments.length > 0 && (
        <div className="mt-3 space-y-3">
          {replyComments.map((reply) => (
            <CommentItem key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
