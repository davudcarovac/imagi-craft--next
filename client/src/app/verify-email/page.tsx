import VerifyEmailClient from "@/components/VerifyEmail/VerifyEmailClient";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailClient />;{" "}
    </Suspense>
  );
};

export default page;
