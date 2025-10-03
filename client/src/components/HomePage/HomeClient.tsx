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
        <div className="max-w-6xl mx-auto px-6 py-[75px] text-center">
          <h1 className="text-4xl md:text-[55px] md:leading-[60px] font-extrabold  text-[#1aac83] mb-4 drop-shadow-lg saira-font">
            Transform your images <br /> effortlessly with Frosty Image
          </h1>
          <p className="text-gray-700 max-w-3xl mx-auto  text-[17px] md:text-lg  mb-8">
            If you want to create quality images, choosing the right software is
            the first step. Unlock your image processing potential with
            FrostyImg.
          </p>
          <Link
            href={"/login"}
            className="bg-[#1aac83] hover:bg-[#1aac83] text-white font-semibold px-8 py-3 text-lg shadow-md hover:shadow-lg saira-font 
             transition-all duration-300 transform hover:scale-105 cursor-pointer"
          >
            Get Started
          </Link>
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
            <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-lg ">
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
                  <p className="text-[16px] md:text-lg  text-gray-600">
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
