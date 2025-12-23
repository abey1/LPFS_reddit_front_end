import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../components/back_button/BackButton";
import { fetchSearchResults } from "./searchPageSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { searchPageSelector } from "./searchPageSlice.js";
import SinglePostMinimal from "../../components/single_post/SinglePostMinimal.jsx";
const SearchPage = () => {
  const dispatch = useDispatch();
  const { isLoading, error, searchResults } = useSelector(searchPageSelector);
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
      </div>
    </div>
  );
};

export default SearchPage;
