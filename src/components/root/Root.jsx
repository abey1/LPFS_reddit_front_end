import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../nav/Nav.jsx";
import SideBarSubReddit from "../side_bar_subreddit/SideBarSubReddit.jsx";
import { useSelector } from "react-redux";
import { selectIsNavOpen } from "../nav/navslice.js";
import { useEffect } from "react";

const Root = () => {
  const isNavOpen = useSelector(selectIsNavOpen);
  useEffect(() => {
    console.log("isNavOpen changed:", isNavOpen);
  }, [isNavOpen]);

  return (
    <>
      <Nav />
      <div className="flex flex-1">
        <main className="flex-1 p-4 overflow-y-auto  mt-20 lg:mr-60 md:mr-30 mr-0  overflow-visible">
          <Outlet />
        </main>
        <aside
          className={`w-64 bg-gray-200 p-4 fixed  top-20 h-full lg:right-10 md:right-0 right-0 lg:block md:block ${
            isNavOpen ? "block" : "hidden"
          }`}
        >
          <SideBarSubReddit />
        </aside>
      </div>
    </>
  );
};

export default Root;
