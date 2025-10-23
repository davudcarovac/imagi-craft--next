"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useVerifyEmail } from "@/hooks/useVerifyEmail";
import { useResendVerificationEmail } from "@/hooks/useResendVerificationEmail";
import { useToast } from "@/context/ToastContext";

export default function VerifyEmailClient() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("vtoken");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [email, setEmail] = useState("");
  const [resendMsg, setResendMsg] = useState("");

  const { isPending, mutate } = useVerifyEmail();
  const { mutate: resendMutate, isPending: isResending } =
    useResendVerificationEmail();
  const { showToast } = useToast();

  const submitVerifyEmail = () => {
    mutate(
      { verificationToken: token || "" },
      {
        onSuccess: (response) => {
          console.log("Verify email response ===> ", response);
          setStatus("success");
          showToast("success", "Email verification", response.message, 4000);
        },
        onError: (error) => {
          console.log("Verify email error ===> ", error);
          setStatus("error");
          showToast("error", "Email verification", error.message, 4000);
        },
      }
    );
  };

  const handleResend = () => {
    if (!email) {
      showToast(
        "error",
        "Missing email",
        "Please enter your email address.",
        3000
      );
      return;
    }

    resendMutate(
      { email: email },
      {
        onSuccess: (res) => {
          setResendMsg(
            res.message || "Verification email resent successfully."
          );
          showToast("success", "Resend Email", res.message, 4000);
        },
        onError: (err) => {
          console.log(err);
          showToast("error", "Resend Email Failed", err.message, 4000);
        },
      }
    );
  };

  useEffect(() => {
    submitVerifyEmail();
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-8 text-center">
        {isPending && (
          <>
            <div className="w-10 h-10 border-4 border-[#1aac83] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-lg font-semibold">Verifying your email...</h2>
            <p className="text-gray-500 text-sm mt-2">Please wait a moment.</p>
          </>
        )}

        {status === "success" && (
          <>
            <h2 className="text-2xl font-semibold saira-font text-[#1aac83]">
              Email Verified
            </h2>
            <p className="text-gray-500 mt-2">
              Your email has been successfully verified. You can now log in.
            </p>
            <button
              onClick={() => router.push("/login")}
              className="mt-6 bg-[#1aac83] saira-font cursor-pointer hover:bg-[#159a74] text-white px-6 py-2 rounded-lg font-medium transition"
            >
              Go to Login
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <h2 className="text-2xl font-semibold text-red-500 saira-font">
              Verification Failed
            </h2>
            <p className="text-gray-500 mt-2">
              The verification link is invalid or has expired.
            </p>

            <div className="flex flex-col items-center mt-6 gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-[#1aac83]"
              />

              <button
                onClick={handleResend}
                disabled={isResending}
                className="bg-[#1aac83] cursor-pointer hover:bg-[#159a74] saira-font text-white px-6 py-2 rounded-lg font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isResending ? "Resending..." : "Resend Verification Email"}
              </button>

              {resendMsg && (
                <p className="text-sm text-gray-600 mt-1">{resendMsg}</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
