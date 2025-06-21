"use client";

import { Dropdown } from "primereact/dropdown";
import React from "react";

type ConvertOptionsProps = {
  globalFormat: string | null;
  formatOptions: { name: string; value: string }[];
  handleGlobalFormatChange: (value: string) => void;
};

const ConvertOptions = ({
  globalFormat,
  formatOptions,
  handleGlobalFormatChange,
}: ConvertOptionsProps) => {
  return (
    <div className="max-w-[760px] mx-auto p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-3   border border-gray-200 rounded-md bg-white shadow-sm">
      <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
        Global Output Format:
      </label>
      <Dropdown
        value={globalFormat}
        options={formatOptions}
        optionLabel="name"
        placeholder="Apply to all"
        onChange={(e) => handleGlobalFormatChange(e.value)}
        className="w-40"
        showClear
      />
    </div>
  );
};

export default ConvertOptions;
