"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import frostyImg from "../../assets/frostyImg-transparent.png";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import InputComponent from "../InputComponent";

const loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required field"),
  password: Yup.string().required("Password is required"),
});

const LoginClient = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <div className="min-h-[80vh] bg-[#f0f4f8] flex items-center justify-center px-4">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="p-10">
          <Image
            src={frostyImg}
            alt="signup-logo"
            width={155}
            height={40}
            className="mb-6"
          />

          <h1 className="text-3xl font-bold text-[#1aac83] my-3 saira-font">
            Welcome Back
          </h1>
          <p className="text-gray-600 mb-6">
            Log in to continue editing and managing your images with ease.
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={(values) => console.log(values)}
            className="space-y-4"
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form>
                <div className="mb-3">
                  <InputComponent
                    type="text"
                    name="email"
                    labelName="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="Email"
                    icon={
                      <i
                        className="pi pi-user text-xl "
                        style={{ color: "gray" }}
                      />
                    }
                  />

                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-[13px]"
                  />
                </div>

                <div className="mb-3">
                  <InputComponent
                    type="password"
                    name="password"
                    labelName="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="Password"
                    icon={
                      <i
                        className="pi pi-envelope text-xl "
                        style={{ color: "gray" }}
                      />
                    }
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-500 text-[13px]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-5 bg-[#1aac83] text-white py-2  hover:bg-[#159a74] saira-font cursor-pointer transition-all duration-300 transform hover:scale-105"
                >
                  Log In
                </button>
              </Form>
            )}
          </Formik>

          <p className="text-sm text-center mt-2 text-gray-600">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-[#1aac83] hover:underline">
              Sign up
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

export default LoginClient;
