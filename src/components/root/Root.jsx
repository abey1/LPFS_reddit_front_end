import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../nav/Nav.jsx";
import SideBarSubReddit from "../side_bar_subreddit/SideBarSubReddit.jsx";
const Root = () => {
  return (
    <>
      <Nav />

      <div className="flex flex-1">
        <main className="flex-1 p-4 overflow-y-auto  border border-red-500 mt-20 lg:mr-66 md:mr-70">
          <Outlet />
        </main>
        <aside className="w-64 bg-gray-200 p-4 fixed  top-20 h-full right-30 lg:block md:block hidden">
          <SideBarSubReddit />
        </aside>
      </div>
    </>
  );
};

export default Root;
