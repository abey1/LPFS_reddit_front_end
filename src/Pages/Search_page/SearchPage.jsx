import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../components/back_button/BackButton";
import {
  fetchSearchResults,
  fetchMoreSearchResults,
} from "./searchPageSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { searchPageSelector } from "./searchPageSlice.js";
import SinglePostMinimal from "../../components/single_post/SinglePostMinimal.jsx";
import LoadMoreButton from "../../components/load_more/LoadMoreButton.jsx";
import { trimSearchResults } from "./searchPageSlice.js";

const SearchPage = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    error,
    searchResults,
    isLoadingMoreSearchResults,
    errorLoadMore,
  } = useSelector(searchPageSelector);
  const { search_term } = useParams();

  useEffect(() => {
    dispatch(fetchSearchResults(search_term));
  }, [search_term, dispatch]);

  if (isLoading) {
    return <p>Loading search results...</p>;
  }
  if (error) {
    return <p>Error loading search results: {error}</p>;
  }

  return (
    <div>
      <BackButton />
      <div>{`search page: ${search_term}`}</div>
      <div className=" w-full  md:w-4/5 ">
        {searchResults.map((post) => (
          <SinglePostMinimal key={post.id} post={post} />
        ))}
        {isLoadingMoreSearchResults ? (
          <p>Loading more search results...</p>
        ) : (
          <LoadMoreButton
            prop={{
              loadMorePosts: () =>
                fetchMoreSearchResults({
                  query: search_term,
                  after: searchResults[searchResults.length - 1]?.name || null,
                }),
              trimList: () => trimSearchResults(),
              error: errorLoadMore,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
