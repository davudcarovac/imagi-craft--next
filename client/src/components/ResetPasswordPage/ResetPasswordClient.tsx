"use client";

import Image from "next/image";
import React, { useRef } from "react";
import frostyImg from "../../assets/frostyImg-transparent.png";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputComponent from "../InputComponent";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";
import { useResetPassword } from "@/hooks/useResetPassword";

const resetSchema = Yup.object({
  newPassword: Yup.string()
    .required("Password is required")
    .min(8, "Password must have at least 8 characters")
    .max(30, "Password must have max 30 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number"),
  confirmNewPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});

type InitialValuesType = {
  newPassword: string;
  confirmNewPassword: string;
  resetToken: string;
};

const ResetPasswordClient = ({ resetToken }: { resetToken: string }) => {
  const toast = useRef<Toast | null>(null);
  const router = useRouter();
  const { isPending, mutate } = useResetPassword();
  const { dispatch } = useAuthContext();

  const initialValues: InitialValuesType = {
    newPassword: "",
    confirmNewPassword: "",
    resetToken: resetToken,
  };

  return (
    <div className="min-h-[80vh] bg-[#f0f4f8] flex items-center justify-center px-4">
      <Toast ref={toast} />
      <div className=" max-w-6xl bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="p-10">
          <Image
            src={frostyImg}
            alt="signup-logo"
            width={155}
            height={40}
            className="mb-6"
          />

          <h1 className="text-3xl font-bold text-[#1aac83] my-3 saira-font">
            Reset password
          </h1>
          <p className="text-gray-600 mb-6">
            Log in to continue editing and managing your images with ease.
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={resetSchema}
            onSubmit={(values: InitialValuesType, { resetForm }) => {
              mutate(values, {
                onSuccess: (response) => {
                  console.log("Response from signup ===> ", response);

                  const { name, email, id, ispremium, role } = response.user;
                  const user = {
                    name,
                    email,
                    id,
                    isPremium: ispremium,
                    token: response.token,
                    role,
                  };
                  localStorage.setItem("user", JSON.stringify(user));
                  dispatch({ type: "LOGIN", payload: user });
                  toast.current?.show({
                    severity: "success",
                    summary: "Success",
                    detail: response.message,
                    life: 4000,
                  });

                  resetForm();
                  router.push("/");
                },
                onError: (error) => {
                  toast.current?.show({
                    severity: "error",
                    summary: "Error",
                    detail: error.message,
                    // life: 4000,
                  });
                },
              });
            }}
            className="space-y-4"
          >
            {({ values, handleChange, handleBlur }) => (
              <Form>
                <div className="mb-3">
                  <InputComponent
                    isPending={isPending}
                    type="password"
                    name="newPassword"
                    labelName="New Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.newPassword}
                    placeholder="New password"
                    icon={
                      <i
                        className="pi pi-user text-xl "
                        style={{ color: "gray" }}
                      />
                    }
                  />

                  <ErrorMessage
                    name="newPassword"
                    component="p"
                    className="text-red-500 text-[13px]"
                  />
                </div>

                <div className="mb-3">
                  <InputComponent
                    isPending={isPending}
                    type="password"
                    name="confirmNewPassword"
                    labelName="Confirm password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmNewPassword}
                    placeholder="Confirm password"
                    icon={
                      <i
                        className="pi pi-envelope text-xl "
                        style={{ color: "gray" }}
                      />
                    }
                  />
                  <ErrorMessage
                    name="confirmNewPassword"
                    component="p"
                    className="text-red-500 text-[13px]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className={` ${
                    isPending ? "opacity-65" : "opacity-100"
                  } w-full mt-3 bg-[#1aac83] text-white py-2  hover:bg-[#159a74] saira-font cursor-pointer transition-all duration-300 transform hover:scale-105`}
                >
                  Confirm
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordClient;
