"use client";

import { PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { Dropdown } from "primereact/dropdown";
import { Dispatch, ReactNode, SetStateAction, useRef } from "react";
import { Slider } from "primereact/slider";
import CustomColorPicker from "./CustomColorPicker";
import { ColorResult } from "@uiw/react-color";
import SubmitButton from "@/components/SubmitButton";
import { FileUpload } from "primereact/fileupload";

type SidebarProps = {
  isOpen: boolean;
  isMobile: boolean;
  children?: ReactNode;
  templates: { value: string; name: string }[];
  template: string;
  gridPadding: number;
  templateBgColor: string;
  activeColor: string;
  borderRadius: number;
  uploadedFiles: { file: File; image: string }[];
  setUploadedFiles: Dispatch<SetStateAction<{ file: File; image: string }[]>>;
  setBorderRadius: Dispatch<SetStateAction<number>>;
  handleColorChange?: (color: ColorResult) => void;
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
  templateBgColor,
  activeColor,
  borderRadius,
  uploadedFiles,
  setUploadedFiles,
  setBorderRadius,
  handleColorChange,
  setGridPadding,
  onClose,
  setTemplate,
}: // children,
SidebarProps) => {
  const fileUploadRef = useRef<FileUpload>(null);

  const uploadHandler = async (event: { files: File[] }) => {
    const files = event.files;

    if (!files || files.length === 0) return;

    // Oslobodi prethodne URL-ove
    uploadedFiles.forEach((file) => {
      try {
        if (file?.image?.startsWith("blob:")) {
          URL.revokeObjectURL(file.image);
        }
      } catch (error) {
        console.error("Error revoking URL:", error);
      }
    });

    // Kreiraj nove URL-ove
    const modifiedFiles = files.map((item) => ({
      image: URL.createObjectURL(item),
      file: item,
    }));

    setUploadedFiles(modifiedFiles);

    // Resetuj file input
    if (fileUploadRef.current) {
      fileUploadRef.current.clear();
    }
  };

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        type="button"
        onClick={onClose}
        className={`fixed lg:hidden z-50 m-2 p-2 rounded-full cursor-pointer bg-white shadow-md ${
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
        className={`bg-white shadow-lg h-[92vh] transition-all duration-300 ${
          isOpen ? "w-[300px]" : "w-0 overflow-hidden"
        } ${isMobile ? "fixed z-40" : "relative"}`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* <h2 className="text-xl font-bold mb-6">Collage Settings</h2> */}
          <div className="flex-1 flex flex-col gap-6 ">
            <section>
              <label className="block font-medium text-lg mb-1 saira-font text-[#1aac83]">
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
            <div>
              <label className="block mb-1 text-[#1aac83] text-lg font-medium saira-font">
                Upload images
              </label>
              <FileUpload
                ref={fileUploadRef}
                key={uploadedFiles.length}
                className="custom-file-upload font-medium"
                multiple
                mode="basic"
                id="image-upload"
                accept="image/*"
                customUpload
                uploadHandler={uploadHandler}
                auto
                chooseLabel="Browse"
              />
            </div>
            <div>
              <label className="block mb-2 text-[#1aac83] text-lg font-medium saira-font">
                Cell spacing
                {/* <span className="font-semibold">{gridPadding}px</span> */}
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
            <div>
              <label className="block mb-2 text-[#1aac83] text-lg font-medium saira-font">
                Border radius
                {/* <span className="font-semibold">{gridPadding}px</span> */}
              </label>
              <Slider
                value={borderRadius}
                onChange={(e) => setBorderRadius(e.value as number)}
                min={0}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
            <div>
              <label className="block mb-2 text-[#1aac83] text-lg font-medium saira-font">
                Background color
              </label>
              <CustomColorPicker
                templateBgColor={templateBgColor}
                handleColorChange={handleColorChange}
                activeColor={activeColor}
                // label="Background color"
                // showColorValue={true}
              />
            </div>

            <div>
              <SubmitButton className="my-3">Generate</SubmitButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
