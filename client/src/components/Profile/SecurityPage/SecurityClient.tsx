"use client";

import ShowContent from "@/components/ShowContent";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useRef, useState } from "react";
import { useChangePassword } from "@/hooks/useChangePassword";
import { Toast } from "primereact/toast";
import { InputOtp } from "primereact/inputotp";
import PasswordInput from "./components/PasswordInput";
import { useTwoFactorSetup } from "@/hooks/useTwoFactorSetup";
import { useVerifyEnableTwoFactor } from "@/hooks/useVerifyEnableTwoFactor";
import { useGetUser } from "@/hooks/useGetUser";
import { useQueryClient } from "@tanstack/react-query";

const changePasswordSchema = Yup.object({
  currentPassword: Yup.string().required("Required field"),
  newPassword: Yup.string()
    .required("Password is required")
    .min(8, "Password must have at least 8 characters")
    .max(30, "Password must have max 30 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number"),
  confirmNewPassword: Yup.string()
    .required("Confirm your password")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});

const SecurityClient = () => {
  const toast = useRef<Toast>(null);
  const { user, isPending: isPendingUser } = useGetUser();

  const [isShownChange, setIsShownChange] = useState(false);
  const [isShown2FaSetup, setIsShown2FaSetup] = useState(false);
  const [isShownDisableTwoFactor, setIsShownDisableTwoFactor] = useState(false);
  const [qrCode, setQrCode] = useState<string | undefined>();
  const [token, setToken] = useState<string | number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const queryClient = useQueryClient();
  const { mutate: mutateChangePassword, isPending: isPendingPassword } =
    useChangePassword();
  const { mutate: mutateTwoFactorSetup, isPending: isPendingTwoFactorSetup } =
    useTwoFactorSetup();
  const {
    mutate: mutateVerifyEnableTwoFactor,
    isPending: isPendingVerifyEnableTwoFactor,
  } = useVerifyEnableTwoFactor();

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const enableTwoFactor = () => {
    mutateTwoFactorSetup(undefined, {
      onSuccess: (response) => {
        console.log("Enable two fa response ===> ", response);
        setIsShown2FaSetup(true);
        setQrCode(response.qrCode);
      },
      onError: (error) => {
        console.log("Enable two fa error ===> ", error);
        setErrorMessage(error.message);
      },
    });
  };

  const cancel2FaActivation = () => {
    setIsShown2FaSetup(false);
    setQrCode(undefined);
    setErrorMessage("");
  };

  const verifyEnableTwoFactor = () => {
    if (typeof token === "string") {
      mutateVerifyEnableTwoFactor(
        { token: token, currentPassword: currentPassword },
        {
          onSuccess: async (response) => {
            console.log("Verify two factor response ===> ", response);
            if (response.success) {
              setIsShown2FaSetup(false);
              setErrorMessage("");
              await queryClient.invalidateQueries({ queryKey: ["user"] });
              toast.current?.show({
                summary: "Success",
                severity: "success",
                detail: response.message,
                life: 3000,
              });
            }
          },

          onError: (error) => {
            console.log("Verify two factor error ===> ", error);
            setErrorMessage(error.message);
          },
        }
      );
    }
  };

  const isDisabledVerifyButton =
    currentPassword === "" || token === "" || isPendingVerifyEnableTwoFactor;

  return (
    <div>
      <Toast ref={toast} />

      <div className="pb-6 sm:pb-10 flex gap-4 flex-col justify-between ">
        <div>
          <h2 className="text-[#1aac83] saira-font text-3xl font-semibold">
            Security
          </h2>
          <p className="text-gray-500 text-sm">
            Manage your password and 2-step verification. Set up security
            measure for better protection.
          </p>
        </div>

        {!isShownChange && (
          <div className="py-2 flex gap-3 items-start sm:items-center flex-col sm:flex-row  justify-between">
            <h2 className="text-[#1aac83] text-2xl font-semibold saira-font">
              Password management
            </h2>
            <button
              onClick={() => setIsShownChange(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-500 cursor-pointer rounded-md font-semibold saira-font hover:bg-blue-200 transition-colors"
            >
              Change password
            </button>
          </div>
        )}
        <ShowContent
          isShown={isShownChange}
          setIsShown={setIsShownChange}
          label="change"
        >
          <div className="py-5">
            <h2 className="text-[#1aac83] saira-font text-2xl font-semibold">
              Change password
            </h2>
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"></div> */}
            <Formik
              validationSchema={changePasswordSchema}
              initialValues={initialValues}
              onSubmit={(values, { resetForm }) => {
                mutateChangePassword(values, {
                  onSuccess: (response) => {
                    console.log("Change password response ===> ", response);
                    toast.current?.show({
                      severity: "success",
                      summary: "Success",
                      detail: response.message,
                      life: 3000,
                    });
                    resetForm();
                    setIsShownChange(false);
                  },
                  onError: (error) => {
                    console.log("Change password response ===> ", error);
                    toast.current?.show({
                      severity: "error",
                      summary: "Error",
                      detail: error.message,
                      life: 3000,
                    });
                  },
                });
              }}
            >
              {({
                values,
                errors,
                touched,
                resetForm,
                handleChange,
                handleBlur,
              }) => (
                <Form>
                  <div className="py-3 grid grid-cols-1 xs:grid-cols-2  md:grid-cols-3 gap-5">
                    <PasswordInput
                      error={touched.currentPassword && errors.currentPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.currentPassword}
                      name="currentPassword"
                      placeholder="Current password"
                      icon="pi pi-lock"
                    />

                    <PasswordInput
                      error={touched.newPassword && errors.newPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.newPassword}
                      name="newPassword"
                      placeholder="New password"
                      icon="pi pi-key"
                    />

                    <PasswordInput
                      error={
                        touched.confirmNewPassword && errors.confirmNewPassword
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmNewPassword}
                      name="confirmNewPassword"
                      placeholder="Confirm password"
                      icon="pi pi-check"
                    />
                  </div>
                  <div className="flex items-center gap-2 my-3">
                    <button
                      disabled={isPendingPassword}
                      type="submit"
                      className="bg-[#1aac83] text-white rounded-md  px-4 py-2 cursor-pointer font-semibold saira-font"
                    >
                      Save Change
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsShownChange(false);
                        resetForm();
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-500 cursor-pointer rounded-md font-semibold saira-font"
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </ShowContent>

        <div>
          <div className="py-2 flex gap-5 items-start sm:items-center flex-col sm:flex-row justify-between">
            <div>
              <h2 className="text-[#1aac83] text-2xl font-semibold saira-font">
                Two-Factor Authentication
              </h2>
              <p className="text-gray-500 text-sm">
                Add an Extra Layer of Security with Two-Factor Authentication{" "}
              </p>
            </div>
            {!user?.twoFactorEnabled
              ? !isShown2FaSetup && (
                  <button
                    onClick={() => {
                      setIsShown2FaSetup(true);
                      enableTwoFactor();
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-500 cursor-pointer rounded-md font-semibold saira-font hover:bg-blue-200 transition-colors"
                  >
                    Enable 2FA
                  </button>
                )
              : !isShownDisableTwoFactor && (
                  <button
                    onClick={() => setIsShownDisableTwoFactor(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-500 cursor-pointer rounded-md font-semibold saira-font"
                  >
                    Disable 2FA
                  </button>
                )}
          </div>
          <ShowContent
            isShown={isShown2FaSetup}
            setIsShown={setIsShown2FaSetup}
            label="enable"
          >
            <div className="w-fit py-5 space-y-5">
              <p className="text-sm text-gray-500">
                Scan the QR code below using an authenticator app such as
                <strong> Google Authenticator</strong>, <strong>Authy</strong>,
                or
                <strong> Microsoft Authenticator</strong>.
              </p>

              <img src={qrCode} alt="QR Code" className="w-48 h-48 mx-auto" />
              <div className="space-y-6">
                {/* ✅ Prvi input ostaje netaknut */}
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-key"></i>
                  </span>
                  <InputText
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    value={currentPassword}
                    type="password"
                    placeholder="Current password"
                    className="placeholder:text-sm"
                  />
                </div>

                {/* ✅ Drugi input (OTP kod) sa labelom i centriranjem */}
                <div className="flex flex-col items-center text-center">
                  <label
                    htmlFor="otp"
                    className="mb-2 text-sm font-medium text-gray-700"
                  >
                    Enter the 6-digit code from your authenticator app
                  </label>
                  <InputOtp
                    id="otp"
                    value={token}
                    onChange={(e) => setToken(e.value ?? null)}
                    length={6}
                    integerOnly
                  />
                  {errorMessage && (
                    <p className="text-red-500 text-sm py-3 font-semibold">
                      {errorMessage}
                    </p>
                  )}
                </div>
                <div className="w-full gap-3 flex items-center justify-center">
                  <button
                    disabled={isDisabledVerifyButton}
                    // type="submit"
                    onClick={verifyEnableTwoFactor}
                    className={`${
                      isDisabledVerifyButton ? "opacity-65" : "opacity-100"
                    } ${
                      isDisabledVerifyButton
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }  bg-[#1aac83] text-white rounded-md  px-4 py-2  font-semibold saira-font min-w-[150px]`}
                  >
                    Enable
                  </button>
                  <button
                    type="button"
                    onClick={cancel2FaActivation}
                    className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-500 cursor-pointer rounded-md font-semibold saira-font"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </ShowContent>
          {user?.twoFactorEnabled && (
            <ShowContent
              label="disable"
              isShown={isShownDisableTwoFactor}
              setIsShown={setIsShownDisableTwoFactor}
            >
              <div className="py-4 flex  flex-col gap-3">
                <div className="p-inputgroup" style={{ width: "250px" }}>
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-key"></i>
                  </span>
                  <InputText
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    value={currentPassword}
                    type="password"
                    placeholder="Current password"
                    className="placeholder:text-sm w-full"
                  />
                </div>
                <div className="flex items-center flex-row gap-3">
                  <button
                    className={`  bg-[#1aac83] text-white rounded-md  px-4 py-2  font-semibold saira-font min-w-[150px]`}
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setIsShownDisableTwoFactor(false)}
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-500 cursor-pointer rounded-md font-semibold saira-font"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </ShowContent>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecurityClient;
