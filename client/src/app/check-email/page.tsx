import CheckYourEmail from "@/components/CheckEmail/CheckEmailClient";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckYourEmail />;
    </Suspense>
  );
};

export default page;
