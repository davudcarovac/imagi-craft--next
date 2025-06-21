"use client";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { SelectButton } from "primereact/selectbutton";
import { Slider } from "primereact/slider";
import { SelectFormatType } from "@/types/types";

type CompressOptionsProps = {
  sliderValue: number;
  selectedFormat: string | null;
  greyscaleValue: string;
  greyscaleOptions: string[];
  formats: SelectFormatType[];
  onSliderChange: (value: number) => void;
  onFormatChange: (value: string | null) => void;
  onGreyscaleChange: (value: string) => void;
  onReset: () => void;
};

const CompressOptions = ({
  sliderValue,
  selectedFormat,
  greyscaleValue,
  greyscaleOptions,
  formats,
  onSliderChange,
  onFormatChange,
  onGreyscaleChange,
  onReset,
}: CompressOptionsProps) => {
  return (
    <div className="max-w-[800px] mx-auto p-4 sm:p-6">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 sm:p-6 space-y-6">
        {/* First row — Compression quality & Greyscale */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Compression Quality */}
          <div className="flex-[2] space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Compression Quality (%)
            </label>
            <div className="flex items-center gap-4 w-full">
              <Slider
                value={sliderValue}
                onChange={(e) => onSliderChange(e.value as number)}
                min={0}
                max={100}
                className="flex-1"
              />
              <InputText
                value={sliderValue.toString()}
                className="no-spinner w-16 border border-gray-300 px-2 py-1 text-center rounded-md"
                readOnly
              />
            </div>
          </div>

          {/* Greyscale */}
          <div className="flex-1 space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Greyscale
            </label>
            <SelectButton
              value={greyscaleValue}
              options={greyscaleOptions}
              onChange={(e) => onGreyscaleChange(e.value)}
              className="w-full"
            />
          </div>
        </div>

        {/* Output format - full width */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Output Format
          </label>
          <Dropdown
            value={selectedFormat}
            options={formats}
            optionLabel="name"
            placeholder="Select format"
            onChange={(e) => onFormatChange(e.value)}
            className="w-auto"
            showClear
          />
        </div>

        {/* Reset button */}
        <div className="flex justify-end">
          <button
            onClick={onReset}
            className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-300 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
          >
            Reset Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompressOptions;
