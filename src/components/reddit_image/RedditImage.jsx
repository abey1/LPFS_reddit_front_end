import { useState } from "react";

const RedditImage = ({ src, alt }) => {
  const [error, setError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  if (error) {
    return (
      <div className="text-center">
        <p className="text-sm text-gray-500">Image failed to load</p>
        <button
          className="text-blue-500 underline focus:cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setError(false);
            setReloadKey((k) => k + 1);
          }}
        >
          Reload image
        </button>
      </div>
    );
  }

  return (
    <img
      key={reloadKey}
      src={src}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setError(true)}
      className="rounded object-cover pr-15 pl-10"
    />
  );
};

export default RedditImage;
