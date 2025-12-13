import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../nav/Nav.jsx";
import SideBarSubReddit from "../side_bar_subreddit/SideBarSubReddit.jsx";
const Root = () => {
  return (
    <>
      <Nav />

      <div className="flex flex-1">
        <main className="flex-1 p-4 overflow-y-auto  mt-20 lg:mr-66 md:mr-45 ">
          <Outlet />
        </main>
        <aside className="w-64 bg-gray-200 p-4 fixed  top-20 h-full lg:right-10 md:right-0 right-0 lg:block md:block hidden">
          <SideBarSubReddit />
        </aside>
      </div>
    </>
  );
};

export default Root;
