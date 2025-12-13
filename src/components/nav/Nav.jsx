import React from "react";
import Search from "../search/Search";
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md">
      <h1>
        <Link to="/" className="text-2xl font-bold text-orange-600">
          Reddit
        </Link>
      </h1>
      <div className="flex items-center justify-center w-full">
        <Search />
      </div>
    </div>
  );
};

export default Nav;
