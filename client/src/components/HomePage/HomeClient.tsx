"use client";

import { actions } from "@/utils/actions";
import ActionCard from "../ActionCard";
import ServiceIntro from "../ServiceIntro";
import { CheckCircle } from "lucide-react"; // ili iz primereact, zavisi šta koristiš
import HomePageVideo from "./HomePageVideo";
// import { useEffect } from "react";

const HomeClient = () => {
  // const csrfToken = document.cookie
  //   .split("; ")
  //   .find((row) => row.startsWith("XSRF-TOKEN="))
  //   ?.split("=")[1];

  // useEffect(() => console.log(csrfToken), [document.cookie]);
  return (
    <div className="min-h-screen w-full  flex justify-center flex-col">
      <div className="flex justify-center py-10 flex-col items-center">
        <div className="max-w-6xl mx-auto px-6 py-10 text-center">
          <h1 className="text-4xl md:text-[68px] md:leading-[76px] font-extrabold  text-[#22C7A8] mb-4 drop-shadow-lg saira-font">
            Transform your images effortlessly with Frosty Image
          </h1>
          <p className="text-gray-700 max-w-3xl mx-auto  text-md md:text-xl  mb-8">
            If you want to create quality images, choosing the right software is
            the first step. Unlock your image processing potential with
            FrostyImg.
          </p>
          <button
            className="bg-[#22C7A8] hover:bg-[#1a9a82] text-white font-semibold px-8 py-3 text-lg shadow-md hover:shadow-lg saira-font 
             transition-all duration-300 transform hover:scale-105 cursor-pointer"
            onClick={() => alert("Get Started clicked!")}
          >
            Get Started
          </button>
        </div>

        <HomePageVideo />
      </div>
      <div className="py-10 bg-white px-10 ">
        <div className="flex justify-center ">
          <div className="max-w-[1290px] w-full space-y-12">
            <ServiceIntro
              titleBeforeHighlight="Powerful Image Tools, All in One Place."
              highlightedWord="Frosty Image"
              titleAfterHighlight=""
              description="Our all-in-one image processing platform lets you compress, convert, crop, resize, and watermark your images — fast, easy, and right in your browser.
          Whether you’re a professional designer, photographer, or just need quick edits, Frosty Image delivers high-quality results with minimal effort.
          Experience seamless image editing powered by cutting-edge technology, designed to save you time and enhance your creative workflow."
              page="home"
            />

            {/* Action cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {actions.map((item) => (
                <ActionCard key={item.actionName} {...item} />
              ))}
            </div>

            {/* Premium plan section */}
            <section className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg shadow-md space-y-4">
              <h2 className="text-2xl font-bold text-yellow-600">
                Upgrade to Premium
              </h2>
              <p className="text-gray-700">
                Unlock exclusive features and take your image processing to the
                next level:
              </p>
              <ul className="space-y-2  mx-auto  mt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-yellow-500 w-5 h-5" />
                  Advanced Face Cropping
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-yellow-500 w-5 h-5" />
                  Super Resolution (AI upscaling)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-yellow-500 w-5 h-5" />
                  Instant Background Removal
                </li>
              </ul>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded-full mt-4 shadow-lg transition">
                Upgrade Now
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeClient;
