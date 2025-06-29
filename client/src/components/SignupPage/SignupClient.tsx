"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import frostyImg from "../../assets/frostyImg-transparent.png";
import InputComponent from "../InputComponent";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const signupSchema = Yup.object({
  name: Yup.string()
    .required("Name is required field")
    .min(4, "Name must have at least 4 characters")
    .max(30, "Name must have max 30 characters"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required field"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must have at least 8 characters")
    .max(30, "Password must have max 30 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const SignupClient = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

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

          <Formik
            initialValues={initialValues}
            validationSchema={signupSchema}
            onSubmit={(values) => console.log(values)}
            className="space-y-4"
          >
            {({ values, handleChange, handleBlur }) => (
              <Form>
                <div className="mb-3">
                  <InputComponent
                    type="text"
                    name="name"
                    labelName="Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    placeholder="Your name"
                    icon={
                      <i
                        className="pi pi-user text-xl "
                        style={{ color: "gray" }}
                      />
                    }
                  />

                  <ErrorMessage
                    name="name"
                    component="p"
                    className="text-red-500 text-[13px]"
                  />
                </div>

                <div className="mb-3">
                  <InputComponent
                    type="text"
                    name="email"
                    labelName="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="you@example.com"
                    icon={
                      <i
                        className="pi pi-envelope text-xl "
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
                    placeholder="••••••••"
                    icon={
                      <i
                        className="pi pi-lock text-xl "
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

                <div className="mb-3">
                  <InputComponent
                    type="password"
                    name="confirmPassword"
                    labelName="Confirm Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    placeholder="••••••••"
                    icon={
                      <i
                        className="pi pi-check text-xl "
                        style={{ color: "gray" }}
                      />
                    }
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="p"
                    className="text-red-500 text-[13px]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-3 bg-[#1aac83] text-white py-2  hover:bg-[#159a74] saira-font cursor-pointer transition-all duration-300 transform hover:scale-105"
                >
                  Sign Up
                </button>
              </Form>
            )}
          </Formik>

          <p className="text-sm text-center mt-2 text-gray-600">
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
