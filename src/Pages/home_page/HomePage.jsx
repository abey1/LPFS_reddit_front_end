import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./homePageSlice";
import SinglePostMinimal from "../../components/single_post/SinglePostMinimal.jsx";
import { postSelector } from "./homePageSlice";
import { isLoadingSelector, errorSelector } from "./homePageSlice.js";
import { nextSelector } from "./homePageSlice";
import LoadMore from "../../components/load_more/LoadMore.jsx";
import { REDDIT_BASE_URL } from "../../api/redditBaseUrl.js";
import { homeDataNextSelector } from "../../components/load_more/loadMoreSlice.js";
import { addMorePosts } from "./homePageSlice.js";
import { beforeSelector } from "./homePageSlice.js";
import { beforeOriginalSelector } from "./homePageSlice.js";

const HomePage = () => {
  const dispatch = useDispatch();
  const posts = useSelector(postSelector);
  const isLoading = useSelector(isLoadingSelector);
  const error = useSelector(errorSelector);
  const next = useSelector(nextSelector);
  const homeDataNext = useSelector(homeDataNextSelector);
  const before = useSelector(beforeSelector);
  const beforeOriginal = useSelector(beforeOriginalSelector);

  console.log("before original:", beforeOriginal);

  console.log("Posts in HomePage:", posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  useEffect(() => {
    console.log("Home data from LoadMore slice:", homeDataNext);
    dispatch(addMorePosts(homeDataNext));
  }, [homeDataNext]);

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
            {before !== null &&
            beforeOriginal !== null &&
            before !== beforeOriginal ? (
              <LoadMore
                prop={{ next: `${before}`, getNext: false, getBefore: true }}
              />
            ) : null}
            {posts.map((post) => (
              <SinglePostMinimal key={post.id} post={post} />
            ))}
            <LoadMore
              prop={{ next: `${next}`, getNext: true, getBefore: false }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
