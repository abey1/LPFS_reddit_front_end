import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../features/home_page/homePageSlice.js";
import SinglePostMinimal from "../../components/single_post/SinglePostMinimal.jsx";
import { postSelector } from "../../features/home_page/homePageSlice.js";
import {
  isLoadingSelector,
  errorSelector,
} from "../../features/home_page/homePageSlice.js";
import { nextSelector } from "../../features/home_page/homePageSlice.js";
import { errorLoadMoreSelector } from "../../features/home_page/homePageSlice.js";

import { REDDIT_BASE_URL } from "../../api/redditBaseUrl.js";

// import { addMorePosts } from "./homePageSlice.js";
import { beforeSelector } from "../../features/home_page/homePageSlice.js";
import { beforeOriginalSelector } from "../../features/home_page/homePageSlice.js";
import { beforeCountSelector } from "../../features/home_page/homePageSlice.js";
import { setBeforeCount } from "../../features/home_page/homePageSlice.js";
import LoadMoreButton from "../../components/load_more/LoadMoreButton.jsx";
import {
  fetchMorePostsNext,
  fetchMorePostsBefore,
} from "../../features/home_page/homePageSlice.js";
import { isLoadingMorePostsSelector } from "../../features/home_page/homePageSlice.js";
import { trimList } from "../../features/home_page/homePageSlice.js";

const HomePage = () => {
  const dispatch = useDispatch();
  const posts = useSelector(postSelector);
  const isLoading = useSelector(isLoadingSelector);
  const error = useSelector(errorSelector);
  const next = useSelector(nextSelector);
  const errorLoadMore = useSelector(errorLoadMoreSelector);
  const before = useSelector(beforeSelector);
  const beforeOriginal = useSelector(beforeOriginalSelector);
  const beforeCount = useSelector(beforeCountSelector);
  const isLoadingMorePosts = useSelector(isLoadingMorePostsSelector);

  console.log("beforeCount:", beforeCount);
  console.log("before:", before);
  console.log("before original:", beforeOriginal);

  console.log("Posts in HomePage:", posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  // useEffect(() => {
  //   console.log("Home data from LoadMore slice:", homeDataNext);
  //   dispatch(
  //     addMorePosts({ data: homeDataNext, isAfter: true, isBefore: false })
  //   );
  // }, [homeDataNext]);

  // useEffect(() => {
  //   console.log("Home data from LoadMore slice:", homeDataBefore);
  //   dispatch(
  //     addMorePosts({ data: homeDataBefore, isAfter: false, isBefore: true })
  //   );
  // }, [homeDataBefore]);

  useEffect(() => {}, [before]);

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
            {/* {beforeCount > 0 &&
              (isLoadingMorePosts ? (
                <p>Loading more posts...</p>
              ) : (
                <LoadMoreButton
                  prop={{
                    loadMorePosts: () =>
                      fetchMorePostsBefore(posts[0]?.name || null),
                    setBeforeCount: () => setBeforeCount(-1),
                    trimList: null,
                    isNext: false,
                  }}
                />
              ))} */}
            {posts.map((post) => (
              <SinglePostMinimal key={post.id} post={post} />
            ))}
            {isLoadingMorePosts ? (
              <p>Loading more posts...</p>
            ) : (
              <LoadMoreButton
                prop={{
                  loadMorePosts: () =>
                    fetchMorePostsNext(posts[posts.length - 1]?.name || null),
                  trimList: () => trimList(),
                  error: errorLoadMore,
                }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
