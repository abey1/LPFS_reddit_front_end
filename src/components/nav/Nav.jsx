import React from "react";
import Search from "../search/Search";
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-white w-full shadow-md fixed right-0 z-50 top-0">
      <h1 className="ml-auto">
        <Link to="/" className="text-2xl font-bold text-orange-600">
          Reddit
        </Link>
      </h1>
      <div className="flex items-center justify-center w-full mr-auto ">
        <Search />
      </div>
    </nav>
  );
};

export default Nav;
