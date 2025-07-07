"use client";

import ShowContent from "@/components/ShowContent";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import React, { useRef, useState } from "react";
import { useChangePassword } from "@/hooks/useChangePassword";
import { Toast } from "primereact/toast";

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
  const [isShown, setIsShown] = useState(false);
  const { mutate: mutateChangePassword, isPending: isPendingPassword } =
    useChangePassword();
  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

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

        {!isShown && (
          <div className="py-2 flex items-center justify-between">
            <h2 className="text-[#1aac83] text-2xl font-semibold saira-font">
              Password management
            </h2>
            <button
              onClick={() => setIsShown(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-500 cursor-pointer rounded-md font-semibold saira-font hover:bg-blue-200 transition-colors"
            >
              Change password
            </button>
          </div>
        )}
        <ShowContent isShown={isShown} setIsShown={setIsShown} label="change">
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
                    setIsShown(false);
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
                    <div>
                      <div className="p-inputgroup ">
                        <span className="p-inputgroup-addon">
                          <i className="pi pi-lock"></i>
                        </span>
                        <InputText
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.currentPassword}
                          name="currentPassword"
                          type="password"
                          placeholder="Current password"
                          className="placeholder:text-sm"
                        />
                      </div>
                      <p className="text-red-500 text-[11px] pt-1">
                        {touched.currentPassword && errors.currentPassword}
                      </p>
                    </div>
                    <div>
                      <div className="p-inputgroup ">
                        <span className="p-inputgroup-addon">
                          <i className="pi pi-key"></i>
                        </span>{" "}
                        <InputText
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.newPassword}
                          name="newPassword"
                          type="password"
                          placeholder="New Password"
                          className="placeholder:text-sm"
                        />
                      </div>
                      <p className="text-red-500 text-[11px] pt-1">
                        {touched.newPassword && errors.newPassword}
                      </p>
                    </div>

                    <div>
                      <div className="p-inputgroup ">
                        <span className="p-inputgroup-addon">
                          <i className="pi pi-check"></i>
                        </span>{" "}
                        <InputText
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.confirmNewPassword}
                          name="confirmNewPassword"
                          type="password"
                          placeholder="Confirm password"
                          className="placeholder:text-sm"
                        />
                      </div>
                      <p className="text-red-500 text-[11px] pt-1">
                        {touched.confirmNewPassword &&
                          errors.confirmNewPassword}
                      </p>
                    </div>
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
                        setIsShown(false);
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
      </div>
    </div>
  );
};

export default SecurityClient;
