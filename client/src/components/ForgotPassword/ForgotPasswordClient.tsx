"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Toast } from "primereact/toast";
import frostyImg from "../../assets/frostyImg-transparent.png";
import InputComponent from "../InputComponent";
import { useForgotPassword } from "@/hooks/useForgotPassword";

const ForgotPasswordClient = () => {
  const toast = useRef<Toast | null>(null);
  const [email, setEmail] = useState("");
  const { mutate, isPending, error: responseError } = useForgotPassword();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const submitForgotPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      { email },
      {
        onSuccess: (response) => {
          toast.current?.show({
            severity: "success",
            summary: "Success",
            detail: response.message,
            life: 4000,
          });
        },
        onError: (error) => {
          toast.current?.show({
            severity: "error",
            summary: "Error",
            detail: error.message,
            life: 4000,
          });
        },
      }
    );
  };

  return (
    <div className="min-h-[80vh] bg-[#f0f4f8] flex items-center justify-center px-4">
      <Toast ref={toast} />
      <div className=" bg-white shadow-lg rounded-xl overflow-hidden ">
        <div className="p-10">
          <Image
            src={frostyImg}
            alt="signup-logo"
            width={155}
            height={40}
            className="mb-6"
          />

          <h1 className="text-3xl font-bold text-[#1aac83] my-3 saira-font">
            Forgot Your Password?
          </h1>
          <p className="text-gray-600 mb-6">
            Enter your email address below and we'll send you a link to reset
            your password.
          </p>
          <form onSubmit={submitForgotPassword}>
            <InputComponent
              type="text"
              placeholder="Email"
              value={email}
              isPending={isPending}
              onChange={handleChange}
              name="email"
              icon={
                <i
                  className="pi pi-envelope text-xl "
                  style={{ color: "gray" }}
                />
              }
            />
            {responseError && (
              <p className="text-center my-3 text-sm text-red-500">
                {responseError.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className={` ${
                isPending ? "opacity-65" : "opacity-100"
              } w-full mt-3 bg-[#1aac83] text-white py-2  hover:bg-[#159a74] saira-font cursor-pointer transition-all duration-300 transform hover:scale-105`}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordClient;
