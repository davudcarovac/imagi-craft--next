"use client";

type ServiceIntroProps = {
  titleBeforeHighlight: string;
  highlightedWord: string;
  titleAfterHighlight: string;
  description: string;
};

export default function ServiceIntro({
  titleBeforeHighlight,
  highlightedWord,
  titleAfterHighlight,
  description,
}: ServiceIntroProps) {
  return (
    <div className="text-center my-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-[#333] mb-2">
        {titleBeforeHighlight}{" "}
        <span className="text-[#1aac83]">{highlightedWord}</span>{" "}
        {titleAfterHighlight}
      </h1>
      <p className="text-[#555] text-base">{description}</p>
    </div>
  );
}
