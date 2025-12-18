import {
  ArrowBigUp,
  ArrowBigDown,
  MessageSquare,
  Share2,
  Bookmark,
} from "lucide-react";
import { Link } from "react-router-dom";

function TypicalRedditPost({ post }) {
  const {
    title,
    author,
    subreddit_name_prefixed,
    ups,
    num_comments,
    created_utc,
    thumbnail,
    url_overridden_by_dest,
  } = post;

  const timeAgo = (utc) => {
    const seconds = Math.floor(Date.now() / 1000 - utc);
    const hours = Math.floor(seconds / 3600);
    if (hours < 1) return "just now";
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  const hasImage =
    url_overridden_by_dest &&
    (url_overridden_by_dest.endsWith(".jpg") ||
      url_overridden_by_dest.endsWith(".png") ||
      url_overridden_by_dest.endsWith(".jpeg"));

  return (
    <div className="bg-white border border-gray-200 rounded-md hover:border-gray-400 transition flex">
      {/* Vote column */}
      <div className="w-12 bg-gray-50 flex flex-col items-center py-2 text-gray-500">
        <ArrowBigUp className="hover:text-orange-500 cursor-pointer" />
        <span className="text-sm font-semibold text-gray-700">{ups}</span>
        <ArrowBigDown className="hover:text-blue-500 cursor-pointer" />
      </div>

      {/* Post content */}
      <div className="flex-1 p-4">
        {/* Meta */}
        <div className="text-xs text-gray-500 mb-1">
          <Link
            to={`/subreddit/${subreddit_name_prefixed.replace("r/", "")}`}
            className="font-semibold text-black hover:underline"
          >
            {subreddit_name_prefixed}
          </Link>
          <span className="mx-1">•</span>
          Posted by{" "}
          <span className="hover:underline cursor-pointer">
            u/{author}
          </span>{" "}
          <span className="mx-1">•</span>
          {timeAgo(created_utc)}
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold mb-2 leading-snug">{title}</h2>

        {/* Image */}
        {hasImage && (
          <div className="mb-3">
            <img
              src={url_overridden_by_dest}
              alt={title}
              className="rounded-md max-h-[480px] object-contain"
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">
            <MessageSquare size={16} />
            <span>{num_comments} Comments</span>
          </div>

          <div className="flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">
            <Share2 size={16} />
            <span>Share</span>
          </div>

          <div className="flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">
            <Bookmark size={16} />
            <span>Save</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TypicalRedditPost;
