"use client";

import React from "react";

type DownloadAllButtonProps = {
  resetAll: () => void;
};

const DownloadAllButton = ({ resetAll }: DownloadAllButtonProps) => {
  return (
    <button
      onClick={resetAll}
      className="bg-[#1aac83] flex items-center flex-row gap-2 px-3 py-2 text-white  text-lg rounded-md saira-font"
    >
      <a href="http://localhost:4000/download-all" download>
        Download All
      </a>{" "}
    </button>
  );
};

export default DownloadAllButton;
