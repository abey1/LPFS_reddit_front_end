import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./homePageSlice";
import SinglePostMinimal from "../../components/single_post/SinglePostMinimal.jsx";
import { postSelector } from "./homePageSlice";
import { isLoadingSelector, errorSelector } from "./homePageSlice.js";
import { nextSelector } from "./homePageSlice";
import LoadMore from "../../components/load_more/LoadMore.jsx";
import { REDDIT_BASE_URL } from "../../api/redditBaseUrl.js";
import { homeDataSelector } from "../../components/load_more/loadMoreSlice.js";
import { addMorePosts } from "./homePageSlice.js";

const HomePage = () => {
  const dispatch = useDispatch();
  const posts = useSelector(postSelector);
  const isLoading = useSelector(isLoadingSelector);
  const error = useSelector(errorSelector);
  const next = useSelector(nextSelector);
  const homeData = useSelector(homeDataSelector);

  console.log("Posts in HomePage:", posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  useEffect(() => {
    console.log("Home data from LoadMore slice:", homeData);
    dispatch(addMorePosts(homeData));
  }, [homeData]);

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
        <div className="flex w-full items-start justify-start ">
          <div className=" w-full md:w-4/5 ">
            {posts.map((post) => (
              <SinglePostMinimal key={post.id} post={post} />
            ))}
            <LoadMore prop={{ next: `${next}` }} />
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
