"use client";

import React from "react";

type DownloadAllButtonProps = {
  resetAll: () => void;
};

const BASE_URL =
  process.env.NEXT_PUBLIC_NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BASE_URL
    : "http://localhost:4000";

const DownloadAllButton = ({ resetAll }: DownloadAllButtonProps) => {
  return (
    <button
      onClick={resetAll}
      className="bg-[#1aac83] flex items-center flex-row gap-2 px-3 py-2 text-white  text-lg rounded-md saira-font"
    >
      <a href={`${BASE_URL}/download-all`} download>
        Download All
      </a>{" "}
    </button>
  );
};

export default DownloadAllButton;
