"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Toast } from "primereact/toast";
import frostyImg from "../../assets/frostyImg-transparent.png";

const SecurityClient = () => {
  const toast = useRef<Toast | null>(null);

  return (
    <div className="min-h-[80vh] bg-[#f0f4f8] flex items-center justify-center px-4">
      <Toast ref={toast} />
      <div className="w-fit bg-white shadow-lg rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="p-10">
          <Image
            src={frostyImg}
            alt="signup-logo"
            width={155}
            height={40}
            className="mb-6"
          />

          <h1 className="text-3xl font-bold text-[#1aac83] my-3 saira-font">
            Change Your Password
          </h1>
          <p className="text-gray-600 mb-6">
            Keep your account secure by setting a new password. Enter your
            current and new password below.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecurityClient;
