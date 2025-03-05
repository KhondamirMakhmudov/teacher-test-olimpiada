import React from "react";
import clsx from "clsx";
import SpinnerIcon from "../icons/spinner";

const ContentLoader = ({ classNames = "" }) => {
  return (
    <div
      className={clsx(
        "flex min-h-[75vh] bg-[#F4F8FA] justify-center items-center",
        classNames
      )}
    >
      <div className="animate-spin">
        <SpinnerIcon width={30} height={30} />
      </div>
    </div>
  );
};

export default ContentLoader;
