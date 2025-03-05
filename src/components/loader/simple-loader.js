import React from "react";

import SpinnerIcon from "../icons/spinner";

const SimpleLoader = ({ classNames = "" }) => {
  return (
    <div className={"flex   justify-center items-center"}>
      <div className="animate-spin">
        <SpinnerIcon width={30} height={30} />
      </div>
    </div>
  );
};

export default SimpleLoader;
