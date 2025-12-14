import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPosts } from "./homePageSlice";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div>
      <h1>Home page</h1>
      <p></p>
    </div>
  );
};

export default HomePage;
