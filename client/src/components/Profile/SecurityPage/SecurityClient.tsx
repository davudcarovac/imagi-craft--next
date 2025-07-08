"use client";

import ShowContent from "@/components/ShowContent";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import React, { useRef, useState } from "react";
import { useChangePassword } from "@/hooks/useChangePassword";
import { Toast } from "primereact/toast";
import PasswordInput from "./components/PasswordInput";

// Validation schema
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
  // Hooks and state
  const toast = useRef<Toast>(null);
  const [isShown, setIsShown] = useState(false);
  const { mutate: mutateChangePassword, isPending: isPendingPassword } =
    useChangePassword();

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  // Handlers
  const handleSubmit = (
    values: typeof initialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    mutateChangePassword(values, {
      onSuccess: (response) => {
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
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: error.message,
          life: 3000,
        });
      },
    });
  };

  const handleCancel = (resetForm: () => void) => {
    setIsShown(false);
    resetForm();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <Toast ref={toast} position="top-right" />

      <div className="space-y-6">
        {/* Header Section */}
        <div className="space-y-2">
          <h2 className="text-emerald-600 font-saira text-2xl md:text-3xl font-semibold">
            Security Settings
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            Manage your password and two-factor authentication. Configure
            security measures for enhanced account protection.
          </p>
        </div>

        {/* Password Management Section */}
        <div className="border-t border-gray-100 pt-4">
          {!isShown && (
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-emerald-600 font-saira text-xl md:text-2xl font-semibold">
                Password Management
              </h3>
              <button
                onClick={() => setIsShown(true)}
                className="btn-primary-outline"
              >
                Change Password
              </button>
            </div>
          )}

          {/* Password Change Form */}
          <ShowContent
            isShown={isShown}
            setIsShown={setIsShown}
            label="Change Password"
          >
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-emerald-600 font-saira text-xl font-semibold mb-4">
                Update Your Password
              </h3>

              <Formik
                validationSchema={changePasswordSchema}
                initialValues={initialValues}
                onSubmit={handleSubmit}
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
                    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                      <PasswordInput
                        icon="pi pi-lock"
                        name="currentPassword"
                        placeholder="Current password"
                        value={values.currentPassword}
                        error={
                          touched.currentPassword && errors.currentPassword
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />

                      <PasswordInput
                        icon="pi pi-key"
                        name="newPassword"
                        placeholder="New password"
                        value={values.newPassword}
                        error={touched.newPassword && errors.newPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />

                      <PasswordInput
                        icon="pi pi-check"
                        name="confirmNewPassword"
                        placeholder="Confirm password"
                        value={values.confirmNewPassword}
                        error={
                          touched.confirmNewPassword &&
                          errors.confirmNewPassword
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="submit"
                        disabled={isPendingPassword}
                        className="btn-primary"
                      >
                        {isPendingPassword ? "Saving..." : "Save Changes"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCancel(resetForm)}
                        className="btn-secondary"
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
        {/* 2-step verification */}
        <div></div>
      </div>
    </div>
  );
};
export default SecurityClient;
