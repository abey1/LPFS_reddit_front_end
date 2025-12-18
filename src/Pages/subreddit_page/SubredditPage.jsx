import React from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../components/back_button/BackButton";
import SubredditHeader from "../../components/subreddit_header/SubredditHeader.jsx";

const SubredditPage = () => {
  const { subreddit_id } = useParams();
  return (
    <div className="">
      <BackButton />

      <SubredditHeader props={subreddit_id} />
    </div>
  );
};

export default SubredditPage;
