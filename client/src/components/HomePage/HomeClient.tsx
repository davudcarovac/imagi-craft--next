"use client";

import { actions } from "@/utils/actions";
import ActionCard from "../ActionCard";
import ServiceIntro from "../ServiceIntro";

const HomeClient = () => {
  return (
    <div className="min-h-screen w-full p-8 flex justify-center">
      <div className="max-w-[1280px] w-full">
        <ServiceIntro
          titleBeforeHighlight="Transform your images effortlessly with"
          highlightedWord="Frosty Image"
          titleAfterHighlight=""
          description=" Our all-in-one image processing platform lets you compress, convert, crop, resize, and watermark your images — fast, easy, and right in your browser.
        Whether you’re a professional designer, photographer, or just need quick edits, ImagiCraft delivers high-quality results with minimal effort.
        Experience seamless image editing powered by cutting-edge technology, designed to save you time and enhance your creative workflow."
          page="home"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {actions.map((item) => (
            <ActionCard key={item.actionName} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeClient;
