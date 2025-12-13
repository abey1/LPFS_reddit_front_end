import React from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../components/back_button/BackButton";
const SearchPage = () => {
  const { search_term } = useParams();
  return (
    <div>
      <BackButton />
      <div>{`search page: ${search_term}`}</div>
    </div>
  );
};

export default SearchPage;
