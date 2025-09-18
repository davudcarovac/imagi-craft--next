"use client";

type ServiceIntroProps = {
  titleBeforeHighlight: string;
  highlightedWord: string;
  titleAfterHighlight: string;
  description: string;
  page?: string; // Optional prop for future use
};

export default function ServiceIntro({
  titleBeforeHighlight,
  highlightedWord,
  titleAfterHighlight,
  description,
  page,
}: ServiceIntroProps) {
  return (
    <div
      className={`text-center my-8 ${
        page === "home" ? "max-w-4xl" : "max-w-4xl"
      } mx-auto   px-8 lg:px-0`}
    >
      <h1 className="text-3xl  md:text-4xl font-bold text-[#333] mb-2 saira-font">
        {titleBeforeHighlight}{" "}
        <span className="text-[#1aac83] saira-font">{highlightedWord}</span>{" "}
        {titleAfterHighlight}
      </h1>
      <p
        className={`text-[#555]  ${
          page === "home" && "py-3"
        } text-[17px] md:text-lg `}
      >
        {description}
      </p>
    </div>
  );
}
