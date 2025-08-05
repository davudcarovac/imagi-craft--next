"use client";

import { actions } from "@/utils/actions";
import ActionCard from "../ActionCard";
import ServiceIntro from "../ServiceIntro";
import {
  CheckCircle,
  Gem,
  Zap,
  ScanEye,
  GalleryVerticalEnd,
  Clock,
  ShieldCheck,
  Users,
  Sparkles,
  ImageIcon,
} from "lucide-react";
import HomePageVideo from "./HomePageVideo";
import CollageFeaturesSection from "./CollageFeatures";

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
            <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-xl border border-gray-200">
              {/* Decorative elements */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
              </div>

              <div className="relative z-10 p-8">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  {/* Left side - Feature showcase */}
                  <div className="flex-1 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full text-sm font-bold text-white mb-2 shadow-sm">
                      <Gem className="w-4 h-4" />
                      PREMIUM
                    </div>

                    <h2 className="text-3xl font-bold text-gray-900">
                      <span className="bg-gradient-to-r from-amber-500 to-purple-600 bg-clip-text text-transparent">
                        Professional Tools
                      </span>
                    </h2>

                    <p className="text-gray-600 text-lg">
                      Unlock studio-grade editing capabilities
                    </p>

                    <ul className="space-y-4">
                      {[
                        {
                          icon: <Zap className="w-5 h-5 text-purple-500" />,
                          text: "AI-Powered Super Resolution (4K upscale)",
                        },
                        {
                          icon: <ScanEye className="w-5 h-5 text-amber-500" />,
                          text: "Precision Background Removal",
                        },
                        {
                          icon: (
                            <GalleryVerticalEnd className="w-5 h-5 text-blue-500" />
                          ),
                          text: "Batch Processing (50+ images)",
                        },
                        {
                          icon: <Clock className="w-5 h-5 text-emerald-500" />,
                          text: "Priority Support",
                        },
                      ].map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            {feature.icon}
                          </div>
                          <span className="text-gray-700">{feature.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right side - Pricing card */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6 w-full md:w-80 flex-shrink-0 shadow-lg">
                    <div className="flex items-end gap-2 mb-4">
                      <span className="text-4xl font-bold text-gray-900">
                        $9
                      </span>
                      <span className="text-gray-500">/month</span>
                    </div>

                    <div className="space-y-4">
                      <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] shadow-md hover:shadow-lg">
                        <Sparkles className="w-5 h-5" />
                        Start Free Trial
                      </button>

                      <div className="text-center text-sm text-gray-500">
                        No credit card required
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        Cancel anytime
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust indicators */}
                <div className="mt-12 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap items-center justify-center gap-6 text-gray-500 text-sm">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-blue-500" />
                      Secure payments
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-amber-500" />
                      Trusted by 50,000+ creatives
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-purple-500" />
                      Latest AI technology
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating product screenshot */}
              <div className="absolute -right-10 -bottom-10 w-72 opacity-90">
                <div className="relative aspect-video bg-white rounded-t-xl overflow-hidden shadow-2xl border border-gray-300">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                    <ImageIcon className="w-12 h-12" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/80 to-transparent p-3">
                    <div className="text-white text-sm font-medium">
                      Editor Preview
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <CollageFeaturesSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeClient;
