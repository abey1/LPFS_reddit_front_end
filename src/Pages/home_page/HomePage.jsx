import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./homePageSlice";
import SinglePostMinimal from "../../components/single_post/SinglePostMinimal.jsx";
import { postSelector } from "./homePageSlice";
import { isLoadingSelector, errorSelector } from "./homePageSlice.js";

const HomePage = () => {
  const dispatch = useDispatch();
  const posts = useSelector(postSelector);
  const isLoading = useSelector(isLoadingSelector);
  const error = useSelector(errorSelector);

  console.log("Posts in HomePage:", posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <>
      {isLoading ? (
        <p>Loading posts...</p>
      ) : error ? (
        <div>
          <p>Error loading posts. Please try again later.</p>
          <button
            className="p-5 hover:cursor-pointer"
            onClick={() => dispatch(fetchPosts())}
          >
            try again
          </button>
        </div>
      ) : (
        <div className="flex w-full justify-center">
          <div>
            {posts.map((post) => (
              <SinglePostMinimal key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
