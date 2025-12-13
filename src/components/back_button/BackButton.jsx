import React from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";

useNavigate;
const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center justify-center rounded-full  w-10 h-10 border text-gray-500 hover:text-gray-700 mb-4"
      >
        <MdArrowBackIos />
      </button>
    </div>
  );
};

export default BackButton;
