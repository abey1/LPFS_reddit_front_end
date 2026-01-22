import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../nav/Nav.jsx";
import SideBarSubReddit from "../side_bar_subreddit/SideBarSubReddit.jsx";
import { useSelector } from "react-redux";
import { selectIsNavOpen } from "../nav/navslice.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleNav } from "../nav/navslice.js";

const Root = () => {
  const isNavOpen = useSelector(selectIsNavOpen);
  const dispatch = useDispatch();
  useEffect(() => {}, [isNavOpen]);

  return (
    <>
      <Nav />
      <div className="flex flex-1">
        <main className="flex-1 lg:pl-10 p-4 overflow-y-auto  mt-20 lg:mr-60 md:mr-30 mr-0  overflow-visible">
          <Outlet />
        </main>
        <aside
          className={` fixed mt-0 lg:w-80 md:w-90 w-full  top-20 h-full lg:right-10 md:right-0 right-0 lg:block md:block ${
            isNavOpen ? "block" : "hidden"
          }`}
        >
          <div className="z-100  lg:w-1/4 md:w-1/3 w-1/2   h-full bg-gray-200 right-0 fixed lg:right-10 ">
            <SideBarSubReddit />
          </div>
          <div
            className="w-full h-full lg:w-0 md:w-0"
            onClick={() => dispatch(toggleNav())}
          ></div>
        </aside>
      </div>
    </>
  );
};

export default Root;
