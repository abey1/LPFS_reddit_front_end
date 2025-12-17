import React from "react";
import { Link } from "react-router-dom";
import BackButton from "../../components/back_button/BackButton";
const Error_404 = () => {
  return (
    <div className="">
      <BackButton />
      <h1 className="">404</h1>
      <h2 className="">Page Not Found</h2>
      <p className="">Sorry, the page you are looking for does not exist.</p>
      <Link to="/">Go Back Home</Link>
    </div>
  );
};

export default Error_404;
