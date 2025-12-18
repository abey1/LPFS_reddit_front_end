import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularSubreddits } from "./sideBarSubRedditSlice";
import { useEffect } from "react";
import {
  selectSubreddits,
  selectIsLoadingSubreddits,
  selectErrorSubreddits,
} from "./sideBarSubRedditSlice";
import SideBarSinglePopularReddit from "./SideBarSinglePopularReddit";
const SideBarSubReddit = () => {
  const dispatch = useDispatch();
  const subreddits = useSelector(selectSubreddits);
  const isLoading = useSelector(selectIsLoadingSubreddits);
  const error = useSelector(selectErrorSubreddits);

  useEffect(() => {
    dispatch(fetchPopularSubreddits());
  }, [dispatch]);

  console.log("Subreddits:", subreddits);

  if (isLoading) {
    return (
      <div>
        <p>Loading post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={() => dispatch(fetchPopularSubreddits())}>
          try again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full p-4 h-full border-gray-600 rounded-lg bg-gray-200 overflow-auto">
      {subreddits.map((subreddit) => (
        <div key={subreddit.id} className="mb-4">
          <SideBarSinglePopularReddit subreddit={subreddit} />
        </div>
      ))}
      <SideBarSinglePopularReddit
        subreddit={{
          id: "2qs0k",
          display_name_prefixed: "r/Home",
          description:
            "Everything home related: interior design, home improvement, architecture.\n\n**Related subreddits**\n--------------------------\n* [/r/InteriorDesign](http://www.reddit.com/r/interiordesign)\n* [/r/architecture](http://www.reddit.com/r/architecture)\n* [/r/houseporn](http://www.reddit.com/r/houseporn)\n* [/r/roomporn](http://www.reddit.com/r/roomporn)\n* [/r/designmyroom](http://www.reddit.com/r/designmyroom)",
          community_icon: "",
          icon_img: "",
          header_img: null,
          subscribers: 375491,
        }}
      />
    </div>
  );
};

export default SideBarSubReddit;
