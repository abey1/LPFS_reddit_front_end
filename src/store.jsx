import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./components/nav/navslice";
import homeReducer from "./Pages/home_page/homePageSlice";
import singlePageReducer from "./Pages/single_post_page/singePostPageSlice";
import commentsReducer from "./components/comments/commentsSlice";
import sideBarSubRedditReducer from "./components/side_bar_subreddit/sideBarSubRedditSlice";
import subredditPageReducer from "./Pages/subreddit_page/subredditPageSlice";
import loadMoreReducer from "./components/load_more/loadMoreSlice";

const loggerMiddleware = () => (next) => (action) => {
  console.log("Before State:", store.getState());
  let result = next(action);
  console.log("Next State:", store.getState());
  return result;
};

const store = configureStore({
  reducer: {
    // Add your slices here
    nav: navReducer,
    homePage: homeReducer,
    singlePost: singlePageReducer,
    comments: commentsReducer,
    sideBarSubreddit: sideBarSubRedditReducer,
    subredditPage: subredditPageReducer,
    loadMore: loadMoreReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(loggerMiddleware);
  },
});

export default store;
