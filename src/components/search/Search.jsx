import React from "react";
import { useForm } from "react-hook-form";
import { LiaSearchSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
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
    <div>
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
            className="border rounded-2xl px-3 py-2"
            {...register("search")}
          />
        </div>
      </form>
    </div>
  );
};

export default Search;
