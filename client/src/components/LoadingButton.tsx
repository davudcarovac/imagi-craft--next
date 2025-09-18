import React from "react";

type LoadingButtonProps = {
  text: string;
  loadingText?: string;
  isPending: boolean;
  type?: "button" | "submit" | "reset";
};

const LoadingButton: React.FC<LoadingButtonProps> = ({
  text,
  loadingText,
  isPending,
  type = "button",
}) => {
  return (
    <button
      type={type}
      disabled={isPending}
      className={`w-full mt-3 py-2 saira-font text-white rounded transition-all duration-300 transform
        ${
          isPending
            ? "opacity-65 cursor-not-allowed bg-[#1aac83]"
            : "bg-[#1aac83] hover:bg-[#159a74] hover:scale-105 cursor-pointer"
        }`}
    >
      <div className="flex items-center justify-center gap-2">
        {isPending && (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        )}
        <span>{isPending ? loadingText || `${text}...` : text}</span>
      </div>
    </button>
  );
};

export default LoadingButton;
