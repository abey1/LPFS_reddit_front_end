import React from "react";
import { PiArrowFatUpThin } from "react-icons/pi";
import { PiArrowFatDownThin } from "react-icons/pi";

const Upvotes = ({ upvotes }) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <PiArrowFatUpThin />
        {upvotes}
        <PiArrowFatDownThin />
      </div>
    </div>
  );
};

export default Upvotes;
