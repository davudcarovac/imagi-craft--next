"use client";

import React from "react";
import SubmitButton from "../SubmitButton";

type WatermarkInfoProps = {
  watermarkSrc?: string | null;
  isPending: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  removeWatermark: () => void;
};

const WatermarkInfo: React.FC<WatermarkInfoProps> = ({
  watermarkSrc,
  position,
  size,
  isPending,
  removeWatermark,
}) => {
  if (!watermarkSrc) return null;

  return (
    <div className="my-6 p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
      <h2 className="text-2xl font-semibold text-[#1aac83] mb-4 border-b border-slate-100 pb-2 saira-font">
        Watermark Details
      </h2>

      <div className="grid grid-cols-2 gap-4 text-sm text-slate-700">
        <div className="space-y-1">
          <p className="font-medium text-slate-600">Position (original):</p>
          <p>
            X:{" "}
            <span className="font-mono text-slate-900">
              {Math.round(position.x)}
            </span>
          </p>
          <p>
            Y:{" "}
            <span className="font-mono text-slate-900">
              {Math.round(position.y)}
            </span>
          </p>
        </div>
        <div className="space-y-1">
          <p className="font-medium text-slate-600">Dimensions (original):</p>
          <p>
            Width:{" "}
            <span className="font-mono text-slate-900">
              {Math.round(size.width)} px
            </span>
          </p>
          <p>
            Height:{" "}
            <span className="font-mono text-slate-900">
              {Math.round(size.height)} px
            </span>
          </p>
        </div>
      </div>

      <div className="mt-10  flex justify-end gap-3">
        <SubmitButton isPending={isPending} className={`my-0 font-semibold`}>
          Apply Watermark
        </SubmitButton>

        <button
          onClick={removeWatermark}
          className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-500 cursor-pointer rounded-md font-semibold saira-font"
        >
          Remove watermark
        </button>
      </div>
    </div>
  );
};

export default WatermarkInfo;
