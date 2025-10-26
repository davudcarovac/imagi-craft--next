"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import frostyImg from "../../assets/frostyImg-transparent.png";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputComponent from "../InputComponent";
import { useLogin } from "@/hooks/useLogin";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { LoginResponse } from "@/types/apiTypes";
import { useVerifyLoginTwoFactor } from "@/hooks/useVerifyLoginTwoFactor";
import { InputOtp } from "primereact/inputotp";
import LoadingButton from "../LoadingButton";
import { useToast } from "@/context/ToastContext";

const loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required field"),
  password: Yup.string().required("Password is required"),
});

type InitialValuesType = {
  email: string;
  password: string;
};

const LoginClient = () => {
  const toast = useRef<Toast | null>(null);
  const [twoFactorRequired, setTwoFactorRequired] = useState(false);
  const [userIdFor2FA, setUserIdFor2FA] = useState<string | null>(null);
  const [otpCode, setOtpCode] = useState<string | null>(null);
  const [errorMsg2FA, setErrorMsg2FA] = useState("");

  const router = useRouter();
  const { isPending, mutate } = useLogin();
  const { mutate: mutateVerifyLogin } = useVerifyLoginTwoFactor();
  const { dispatch } = useAuthContext();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const initialValues: InitialValuesType = {
    email: "",
    password: "",
  };

  const otpDisbled = !otpCode || otpCode.length !== 6;

  const verifyLoginTwoFactor = () => {
    mutateVerifyLogin(
      { token: otpCode, id: userIdFor2FA },
      {
        onSuccess: (response) => {
          queryClient.invalidateQueries({ queryKey: ["user"] });
          localStorage.setItem("user", JSON.stringify(response.user));
          dispatch({ type: "LOGIN", payload: response.user });
          showToast("success", "2FA Log in", response.message, 4000);
          setErrorMsg2FA("");
          router.push("/");
        },
        onError: (error) => {
          console.log("Verify login error ===> ", error);
          setErrorMsg2FA(error.message);

          showToast("error", "2FA Log in", error.message, 4000);
        },
      }
    );
  };

  return (
    <div className="min-h-[89vh] bg-[#f0f4f8] flex items-center justify-center px-4">
      <Toast ref={toast} />
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

          <>
            {!twoFactorRequired ? (
              <Formik
                initialValues={initialValues}
                validationSchema={loginSchema}
                onSubmit={(values, { resetForm }) => {
                  mutate(values, {
                    onSuccess: (response: LoginResponse) => {
                      if ("user" in response) {
                        queryClient.invalidateQueries({ queryKey: ["user"] });
                        localStorage.setItem(
                          "user",
                          JSON.stringify(response.user)
                        );
                        dispatch({ type: "LOGIN", payload: response.user });
                        showToast("success", "Log in", response.message, 4000);
                        resetForm();
                        router.push("/");
                      } else if (
                        "twoFactor" in response &&
                        response.twoFactor === true
                      ) {
                        setTwoFactorRequired(true);
                        setUserIdFor2FA(response.userId);
                      } else {
                        console.warn("Unexpected response format:", response);
                      }
                    },
                    onError: (error) => {
                      console.log(error);
                      showToast("error", "Log in", error.message, 4000);
                    },
                  });
                }}
              >
                {({ values, handleChange, handleBlur }) => (
                  <Form>
                    <div className="mb-3">
                      <InputComponent
                        isPending={isPending}
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
                        isPending={isPending}
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

                    <LoadingButton
                      text="Log In"
                      loadingText="Logging in..."
                      isPending={isPending}
                      type="submit"
                    />
                  </Form>
                )}
              </Formik>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <p className="text-center text-sm text-gray-600">
                  Two-Factor Authentication is enabled. Please enter the 6-digit
                  code from your authenticator app.
                </p>
                <InputOtp
                  value={otpCode}
                  onChange={(e) =>
                    setOtpCode(
                      e.value !== undefined && e.value !== null
                        ? String(e.value)
                        : null
                    )
                  }
                  length={6}
                  integerOnly
                />
                {errorMsg2FA && (
                  <p className="text-sm text-red-500 font-semibold">
                    {errorMsg2FA}
                  </p>
                )}
                <button
                  onClick={verifyLoginTwoFactor}
                  disabled={otpDisbled}
                  className={`${otpDisbled ? "opacity-70" : "opacity-100"}
                    ${
                      otpDisbled ? "cursor-not-allowed" : "cursor-pointer"
                    } bg-[#1aac83] text-white px-4 py-2 rounded-md hover:bg-[#159a74] transition-all saira-font font-semibold`}
                >
                  Verify Code
                </button>
              </div>
            )}
          </>

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
