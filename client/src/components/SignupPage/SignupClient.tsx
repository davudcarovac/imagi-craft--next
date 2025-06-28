"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import frostyImg from "../../assets/frostyImg-transparent.png";

const SignupClient = () => {
  return (
    <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center px-4">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* LEFT - Sign Up Form */}
        <div className="p-10">
          <Image
            src={frostyImg}
            alt="signup-logo"
            width={155}
            height={40}
            className="mb-6"
          />

          <h1 className="text-3xl font-bold text-[#1aac83] my-3 saira-font">
            Create Account
          </h1>
          <p className="text-gray-600 mb-6">
            Join us and start editing your images in seconds.
          </p>

          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1aac83]"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1aac83]"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1aac83]"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Confirm password
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1aac83]"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1aac83] text-white py-2 rounded-md hover:bg-[#159a74] transition-colors"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-[#1aac83] hover:underline">
              Log in
            </Link>
          </p>
        </div>

        {/* RIGHT - Visual / Info Section */}
        <div className="bg-[#1aac83] text-white flex flex-col items-center justify-center p-10">
          <h2 className="text-3xl font-semibold mb-3 saira-font">
            Welcome to FrostyImage
          </h2>
          <p className="text-center text-white/90">
            Enhance your images with our simple and powerful tools for
            compression, resizing, cropping and more.
          </p>

          <div className="my-10 flex items-center justify-center">
            <video
              src="/signup-wm-video.mp4"
              autoPlay
              muted
              playsInline
              loop
              className="w-[85%] rounded-md filter "
            />
          </div>
          {/* <div className="mt-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-32 h-32 opacity-90"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5V8.25a1.5 1.5 0 011.5-1.5h6.379a1.5 1.5 0 011.06.44l7.871 7.871a1.5 1.5 0 01.44 1.06V19.5a1.5 1.5 0 01-1.5 1.5H6a3 3 0 01-3-3z"
              />
            </svg>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SignupClient;
