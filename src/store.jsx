import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./components/nav/navslice";
import homeReducer from "./Pages/home_page/homePageSlice";

const loggerMiddleware = (store) => (next) => (action) => {
  // console.log("Before State:", store.getState());
  let result = next(action);
  // console.log("Next State:", store.getState());
  return result;
};

const store = configureStore({
  reducer: {
    // Add your slices here
    nav: navReducer,
    homePage: homeReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(loggerMiddleware);
  },
});

export default store;
