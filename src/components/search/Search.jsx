import React from "react";
import { useForm } from "react-hook-form";
import { LiaSearchSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Search = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
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
              <LiaSearchSolid className="text-3xl" />
            </label>

            <input
              id="search"
              name="search"
              type="text"
              placeholder="search reddit"
              className="border rounded-2xl px-3 py-2 lg:w-140 md:w-100 sm:w-80 xm:w-60 w-40"
              {...register("search")}
            />
          </div>
        </form>
      </div>
      <div className="lg:hidden md:hidden block flex items-center justify-center ml-2">
        <FaBars />
      </div>
    </div>
  );
};

export default Search;
