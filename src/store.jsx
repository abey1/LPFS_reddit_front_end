import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./components/nav/navslice";
import homeReducer from "./features/home_page/homePageSlice";
import singlePageReducer from "./features/single_post_page/singePostPageSlice";
import commentsReducer from "./components/comments/commentsSlice";
import sideBarSubRedditReducer from "./components/side_bar_subreddit/sideBarSubRedditSlice";
import subredditPageReducer from "./features/subreddit_page/subredditPageSlice";
import searchPageReducer from "./features/search_page/searchPageSlice";

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
    searchPage: searchPageReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(loggerMiddleware);
  },
});

export default store;
