"use client";

import { Dropdown } from "primereact/dropdown";
import React from "react";
import type { DropdownPassThroughMethodOptions } from "primereact/dropdown";

type FormatOption = {
  name: string;
  value: string;
};

type ConvertOptionsProps = {
  globalFormat: string | null;
  formatOptions: FormatOption[];
  handleGlobalFormatChange: (value: string) => void;
};

const ConvertOptions = ({
  globalFormat,
  formatOptions,
  handleGlobalFormatChange,
}: ConvertOptionsProps) => {
  return (
    <div className="max-w-[760px] mx-auto p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-3">
        <span className=" font-medium text-[#1aac83] whitespace-nowrap">
          Convert all to:
        </span>
        <Dropdown
          value={globalFormat}
          options={formatOptions}
          optionLabel="name"
          placeholder="Select format"
          onChange={(e) => handleGlobalFormatChange(e.value)}
          className="w-full sm:w-48"
          showClear
          pt={{
            root: {
              className:
                "border border-[#1aac83]/30 rounded-md hover:border-[#1aac83] focus-within:border-[#1aac83] focus-within:ring-1 focus-within:ring-[#1aac83]/50",
            },
            input: {
              className: "py-2 text-sm text-gray-700",
            },
            trigger: {
              className: "text-[#1aac83]",
            },
            panel: {
              className: "shadow-lg border border-[#1aac83]/20",
            },
            item: (options: DropdownPassThroughMethodOptions) => ({
              className: options.context?.selected
                ? "bg-[#1aac83]/10 text-[#1aac83] font-medium"
                : "hover:bg-[#1aac83]/5",
            }),
            clearIcon: {
              className: "text-[#1aac83]/70 hover:text-[#1aac83]",
            },
          }}
        />
      </div>
    </div>
  );
};

export default ConvertOptions;
