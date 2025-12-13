import React from "react";
import { useForm } from "react-hook-form";
import { LiaSearchSolid } from "react-icons/lia";

const Search = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
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
            className="border rounded-2xl px-3 py-2"
            {...register("search")}
          />
        </div>
      </form>
    </div>
  );
};

export default Search;
