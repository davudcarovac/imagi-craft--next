"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Mail, Loader2, CheckCircle } from "lucide-react";
import { useResendVerificationEmail } from "@/hooks/useResendVerificationEmail";
import { useToast } from "@/context/ToastContext";

export default function CheckYourEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [resent, setResent] = useState(false);
  const { showToast } = useToast();

  const { isPending: resending, mutate } = useResendVerificationEmail();

  const handleResend = () => {
    mutate(
      { email: email },
      {
        onSuccess: ({ success, message }) => {
          // console.log("Success response ===> ", message);
          setResent(success);
          showToast("success", "Success", message, 4000);
        },
        onError: (error) => {
          // console.log("Error response ===> ", error);
          showToast("error", "Error", error.message);
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-2xl p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <Mail className="w-12 h-12 text-[#1aac83]" />
        </div>

        <h1 className="text-2xl font-semibold text-gray-800 mb-2 saira-font">
          Check your email
        </h1>

        <p className="text-gray-600 mb-6">
          We’ve sent a verification link to{" "}
          <span className="font-medium text-gray-900">{email}</span>. <br />
          Please click the link in your inbox to verify your account.
        </p>

        {!resent ? (
          <button
            onClick={handleResend}
            disabled={resending}
            className="bg-[#1aac83]  hover:bg-[#15956f] font-semibold cursor-pointer saira-font text-white px-6 py-2 rounded-lg disabled:opacity-50 transition"
          >
            {resending ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin w-4 h-4" />
                Sending...
              </span>
            ) : (
              "Resend verification email"
            )}
          </button>
        ) : (
          <div className="flex items-center justify-center gap-2 text-green-600 font-medium">
            <CheckCircle className="w-5 h-5" />
            Email sent again!
          </div>
        )}

        <p className="text-sm text-gray-500 mt-6">
          Didn’t receive it? Check your spam folder or try again.
        </p>

        <button
          onClick={() => router.push("/login")}
          className="text-[#1aac83] cursor-pointer font-medium mt-6 hover:underline"
        >
          Back to login
        </button>
      </div>
    </div>
  );
}
