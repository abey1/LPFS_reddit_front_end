import React from "react";
import { useForm } from "react-hook-form";
import { LiaSearchSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { toggleNav } from "../nav/navslice";
import { selectIsNavOpen } from "../nav/navslice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const isNavOpen = useSelector(selectIsNavOpen);
  const onSubmit = (data) => {
    if (data.search === "") {
      navigate("/");
      return;
    }
    navigate(`/search/${data.search}`);
  };
  return (
    <div className="flex justify-between w-full">
      <div className="w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-3 justify-center items-center">
            <label htmlFor="search">
              <LiaSearchSolid className="text-3xl text-red-500" />
            </label>

            <input
              id="search"
              name="search"
              type="text"
              placeholder="search reddit"
              className="border border-gray-300 rounded-2xl px-3 py-2 lg:w-140 md:w-100 sm:w-80 xm:w-60 w-40 focus:outline-none focus:ring-2 focus:ring-[#F54A00]"
              {...register("search")}
            />
          </div>
        </form>
      </div>
      <button
        className="lg:hidden md:hidden block flex items-center justify-center ml-2"
        onClick={() => {
          dispatch(toggleNav());
          console.log("toggled");
        }}
      >
        {isNavOpen ? <FaX /> : <FaBars />}
      </button>
    </div>
  );
};

export default Search;
