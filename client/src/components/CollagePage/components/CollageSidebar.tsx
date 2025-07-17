"use client";

import { PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { Dropdown } from "primereact/dropdown";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { Slider } from "primereact/slider";

type SidebarProps = {
  isOpen: boolean;
  isMobile: boolean;
  children?: ReactNode;
  templates: { value: string; name: string }[];
  template: string;
  gridPadding: number;
  setGridPadding: Dispatch<SetStateAction<number>>;
  onClose: () => void;
  setTemplate: Dispatch<SetStateAction<string>>;
};

const Sidebar = ({
  isOpen,
  template,
  templates,
  isMobile,
  gridPadding,
  setGridPadding,
  onClose,
  setTemplate,
  children,
}: SidebarProps) => {
  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        onClick={onClose}
        className={`fixed lg:hidden z-50 m-2 p-2 rounded-full bg-white shadow-md ${
          isOpen ? "left-[250px]" : "left-2"
        } transition-all duration-300 hover:bg-gray-100`}
      >
        {isOpen ? (
          <PanelLeftClose className="w-5 h-5 text-gray-600" />
        ) : (
          <PanelLeftOpen className="w-5 h-5 text-gray-600" />
        )}
      </button>

      {/* Sidebar Content */}
      <div
        className={`bg-white shadow-lg h-[90vh] transition-all duration-300 ${
          isOpen ? "w-[300px]" : "w-0 overflow-hidden"
        } ${isMobile ? "fixed z-40" : "relative"}`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* <h2 className="text-xl font-bold mb-6">Collage Settings</h2> */}
          <div className="flex-1 ">
            <section>
              <label className="block font-medium text-lg mb-2 saira-font text-[#1aac83]">
                Choose layout
              </label>
              <Dropdown
                value={template}
                onChange={(e) => setTemplate(e.value)}
                options={templates}
                optionLabel="name"
                placeholder="Select template"
                className="w-full"
              />
            </section>
            <div className="my-6">
              <label className="block mb-2 text-[#1aac83] text-lg font-medium">
                Cell spacing:{" "}
                <span className="font-semibold">{gridPadding}px</span>
              </label>
              <Slider
                value={gridPadding}
                onChange={(e) => setGridPadding(e.value as number)}
                min={0}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
