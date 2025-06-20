// app/watermark-image/WatermarkClientWrapper.tsx
"use client";

import dynamic from "next/dynamic";

const WatermarkClient = dynamic(
  () => import("@/components/WatermarkPage/WatermarkClient"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

export default function WatermarkClientWrapper() {
  return <WatermarkClient />;
}
