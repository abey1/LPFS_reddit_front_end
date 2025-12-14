import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./homePageSlice";
import SinglePostMinimal from "../../components/single_post/SinglePostMinimal.jsx";
import { postSelector } from "./homePageSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const posts = useSelector(postSelector);
  console.log("Posts in HomePage:", posts);
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div>
      <h1>Home page</h1>
      {posts.map((post) => (
        <SinglePostMinimal key={post.id} post={post} />
      ))}
    </div>
  );
};

export default HomePage;
