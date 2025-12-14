import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./components/nav/navslice";
import homeReducer from "./Pages/home_page/homePageSlice";
import singlePageReducer from "./Pages/single_post_page/singePostPageSlice";

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
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(loggerMiddleware);
  },
});

export default store;
