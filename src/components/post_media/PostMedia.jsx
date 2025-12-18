import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";

function PostMedia({ post }) {
  const [index, setIndex] = useState(0);

  const {
    is_video,
    media,
    secure_media,
    url_overridden_by_dest,
    post_hint,
    media_metadata,
    gallery_data,
  } = post;

  /* ---------- Gallery ---------- */
  if (post_hint === "image" && gallery_data && media_metadata) {
    const images = gallery_data.items.map((item) =>
      media_metadata[item.media_id].s.u.replace(/&amp;/g, "&")
    );

    return (
      <div className="relative bg-black rounded-md overflow-hidden">
        <img
          src={images[index]}
          alt={`Gallery image ${index + 1}`}
          className="w-full max-h-[520px] object-contain"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={() =>
                setIndex((index - 1 + images.length) % images.length)
              }
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full hover:bg-black"
            >
              <FaChevronLeft />
            </button>

            <button
              onClick={() => setIndex((index + 1) % images.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full hover:bg-black"
            >
              <FaChevronRight />
            </button>
          </>
        )}
      </div>
    );
  }

  /* ---------- Reddit Video ---------- */
  if (is_video && secure_media?.reddit_video) {
    return (
      <video
        controls
        onClick={(e) => e.stopPropagation()}
        className="w-full rounded-md max-h-[520px] bg-black"
        src={secure_media.reddit_video.fallback_url}
      />
    );
  }

  /* ---------- Single Image ---------- */
  if (post_hint === "image") {
    return (
      <img
        src={url_overridden_by_dest}
        alt="Post media"
        className="w-full rounded-md max-h-[520px] object-contain"
      />
    );
  }

  /* ---------- External Link ---------- */
  if (post_hint === "link") {
    return (
      <a
        href={url_overridden_by_dest}
        target="_blank"
        onClick={(e) => e.stopPropagation()}
        rel="noopener noreferrer"
        className="block border rounded-md p-4 hover:bg-gray-50 transition"
      >
        <div className="flex items-center gap-2 text-blue-600">
          <FaExternalLinkAlt size={16} />
          <span className="truncate">{url_overridden_by_dest}</span>
        </div>
      </a>
    );
  }

  return null;
}

export default PostMedia;
