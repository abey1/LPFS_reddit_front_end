import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./Pages/home_page/HomePage.jsx";
import SubredditPage from "./Pages/subreddit_page/SubredditPage.jsx";
import SinglePostPage from "./Pages/single_post_page/SinglePostPage.jsx";
import Root from "./components/root/Root.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="subreddit/:subreddit_id" element={<SubredditPage />} />
      <Route path="post/:post_id" element={<SinglePostPage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
