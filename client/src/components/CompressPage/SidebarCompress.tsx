import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton";
import { Slider, SliderChangeEvent } from "primereact/slider";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { formats } from "../../utils/selectData";
import "primeicons/primeicons.css";

type SidebarCompressProps = {
  isOpen: boolean;
  sliderValue: number;
  selectedFormat: string | null;
  greyscaleValue: string;
  greyscaleOptions: string[];
  setSelectedFormat: React.Dispatch<React.SetStateAction<string | null>>;
  handleSliderValue: (e: SliderChangeEvent) => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setGreyscaleValue: React.Dispatch<React.SetStateAction<string>>;
};

const SidebarCompress = ({
  isOpen,
  sliderValue,
  selectedFormat,
  greyscaleValue,
  greyscaleOptions,
  setSelectedFormat,
  setIsOpen,
  handleSliderValue,
  setGreyscaleValue,
}: SidebarCompressProps) => {
  return (
    <div className="card flex justify-content-center">
      <Sidebar
        visible={isOpen}
        onHide={() => setIsOpen(false)}
        style={{ backgroundColor: "#f4f4f4", padding: 0 }}
      >
        <h2 className="text-xl font-semibold text-center pb-8">
          Compress options
        </h2>
        <div className="px-5">
          {/* Compression quality */}
          <div>
            <h3 className="text-[#1aac83] text-md py-2">Quality level</h3>
            <div className="w-full flex items-center flex-row gap-3 p-3  rounded-md">
              <Slider
                value={sliderValue}
                onChange={handleSliderValue}
                min={0}
                max={100}
                step={1}
                style={{ minWidth: "200px" }}
              />
              {/* <div className="py-1 bg-[#f6fff8] border border-[#1aac83] border-solid w-12 text-center flex items-center justify-center rounded-md"> */}
              <p className="text-sm">{sliderValue}%</p>
              {/* </div> */}
            </div>
          </div>
          {/* Change format */}
          <div className="py-6">
            <h3 className="text-[#1aac83] text-md py-2">Change format</h3>
            <Dropdown
              value={selectedFormat}
              onChange={(e: DropdownChangeEvent) => setSelectedFormat(e.value)}
              options={formats}
              optionLabel="name"
              placeholder="Select format"
              showClear={true}
              className="w-max md:w-14rem"
            />
          </div>

          {/* Greyscale */}
          <div className="py-2">
            <h3 className="text-[#1aac83] text-md py-2">Greyscale</h3>
            <SelectButton
              value={greyscaleValue}
              onChange={(e: SelectButtonChangeEvent) =>
                setGreyscaleValue(e.value)
              }
              options={greyscaleOptions}
            />
          </div>
        </div>
      </Sidebar>
      {/* <Button
        icon="pi pi-arrow-right"
        type="button"
        onClick={() => setIsOpen(true)}
      /> */}
    </div>
  );
};

export default SidebarCompress;
