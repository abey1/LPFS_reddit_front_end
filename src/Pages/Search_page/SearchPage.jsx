import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../components/back_button/BackButton.jsx";
import {
  fetchSearchResults,
  fetchMoreSearchResults,
} from "../../features/search_page/searchPageSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { searchPageSelector } from "../../features/search_page/searchPageSlice.js";
import SinglePostMinimal from "../../components/single_post/SinglePostMinimal.jsx";
import LoadMoreButton from "../../components/load_more/LoadMoreButton.jsx";
import { trimSearchResults } from "../../features/search_page/searchPageSlice.js";
import { Virtuoso } from "react-virtuoso";

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
        <div style={{ height: "100vh", width: "100%" }}>
          <Virtuoso
            data={searchResults}
            itemContent={(index, post) => <SinglePostMinimal post={post} />}
            components={{
              Footer: () => {
                if (isLoadingMoreSearchResults)
                  return <p>Loading more search results...</p>;
                else
                  return (
                    <LoadMoreButton
                      onLoadMore={() => {
                        const after =
                          searchResults[searchResults.length - 1]?.name;
                        if (after) {
                          return fetchMoreSearchResults({
                            query: search_term,
                            after:
                              searchResults[searchResults.length - 1]?.name ||
                              null,
                          });
                        } else {
                          return null;
                        }
                      }}
                      onTrim={() => trimSearchResults()}
                      error={errorLoadMore}
                    />
                  );
              },
            }}
          />
        </div>
        {/* {searchResults.map((post) => (
          <SinglePostMinimal key={post.id} post={post} />
        ))}
        {isLoadingMoreSearchResults ? (
          <p>Loading more search results...</p>
        ) : (
          <LoadMoreButton
            onLoadMore={() => {
              const after = searchResults[searchResults.length - 1]?.name;
              if (after) {
                return fetchMoreSearchResults({
                  query: search_term,
                  after: searchResults[searchResults.length - 1]?.name || null,
                });
              } else {
                return null;
              }
            }}
            onTrim={() => trimSearchResults()}
            error={errorLoadMore}
          />
        )} */}
      </div>
    </div>
  );
};

export default SearchPage;
