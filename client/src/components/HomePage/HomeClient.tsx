"use client";

import { actions } from "@/utils/actions";
import ActionCard from "../ActionCard";
import ServiceIntro from "../ServiceIntro";
import { Crop, Wand2 } from "lucide-react";
import HomePageVideo from "./HomePageVideo";
import CollageFeaturesSection from "./CollageFeatures";
import Link from "next/link";
import Footer from "../Footer";

const HomeClient = () => {
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
            <section className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
              {/* Dekorativni blur krugovi */}

              <div className="relative z-10 p-8 md:p-12">
                <div className="max-w-3xl ">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-500 rounded-full text-sm font-bold mb-4 shadow-sm border border-blue-100">
                    <Wand2 className="w-4 h-4" />
                    NEW AI FEATURE
                  </div>

                  {/* Naslov */}
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    <span className="text-[#1aac83] bg-clip-text saira-font">
                      Smart Face Crop
                    </span>
                  </h2>

                  {/* Opis */}
                  <p className="text-lg text-gray-600">
                    Automatically detect and perfectly crop faces with our
                    AI-powered tool. Ideal for profile pictures, passports, and
                    social media.
                  </p>
                  <Link
                    href={"/crop-face"}
                    className="bg-[#1aac83] hover:bg-[#1a9a82] text-white font-semibold px-8 py-3 my-6 text-lg shadow-md hover:shadow-lg saira-font 
             transition-all duration-300 transform hover:scale-105 cursor-pointer flex items-center flex-row gap-1 w-fit"
                  >
                    Crop face <Crop />
                  </Link>
                </div>
              </div>
            </section>

            <CollageFeaturesSection />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomeClient;
