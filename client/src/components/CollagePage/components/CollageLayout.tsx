"use client";

import { Slider } from "primereact/slider";
import React, { useState, useEffect } from "react";
import { CollageTemplate, PROFESSIONAL_TEMPLATES } from "../utils/templates";
import Image from "next/image";
import { UploadCloud, Pencil } from "lucide-react";
import fillImg from "@/assets/button images/user.png";

// type GridPreviewProps = {
//   width?: number;
//   height?: number;
//   rows?: number;
//   cols?: number;
//   cellPadding?: number;
//   displayScale?: number;
// };

type CollageTestProps = { templateName?: string; gridPadding?: number };

const templates = [
  { value: "CLASSIC", name: "2x2" },
  { value: "PRINT_POSTER", name: "A4 Poster" },
  { value: "INSTAGRAM_GRID", name: "Instagram grid" },
  { value: "PINTEREST_PIN", name: "Pinterest pin" },
  { value: "INSTAGRAM_STORY", name: "Instagram Story Split" },
  { value: "PHOTO_BOOTH", name: "Photo Booth Strip" },
  { value: "BEFORE_AFTER", name: "Before / After" },
  { value: "MAGAZINE_SPREAD", name: "Magazine spread" },
];

const CollageLayout: React.FC<CollageTestProps> = ({
  templateName = "INSTAGRAM_GRID",
  gridPadding = 3,
}) => {
  const [template, setTemplate] = useState<CollageTemplate>(
    PROFESSIONAL_TEMPLATES[templateName]
  );

  useEffect(
    () => setTemplate(PROFESSIONAL_TEMPLATES[templateName]),
    [templateName]
  );

  const { width, height, rows, cols, displayScale } = template;
  const [scale, setScale] = useState(template.displayScale || 1);
  const [isClient, setIsClient] = useState(false);
  // const [gridPadding, setGridPadding] = useState<number>(cellPadding || 3);

  const [uploadedFiles, setUploadedFiles] = useState<
    { file: File; image: string }[]
  >(Array(rows * cols).fill(null));

  const handleUploadByIndex = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newFiles = [...uploadedFiles];
    newFiles[index] = { file: file, image: URL.createObjectURL(file) };
    setUploadedFiles(newFiles);
    uploadedFiles;
  };

  // Debounce function
  const useDebounce = (value: number, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  };

  const calculateScale = () => {
    if (!isClient) return displayScale || 0.8;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight * 0.9;

    const widthScale = (viewportWidth * 0.9) / width;
    const heightScale = viewportHeight / height;

    return Math.min(widthScale, heightScale) * (displayScale || 0.8);
  };

  const debouncedScale = useDebounce(scale, 100);

  useEffect(() => {
    setIsClient(true);

    const handleResize = () => {
      setScale(calculateScale());
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isClient, width, height, displayScale]);

  // useEffect(() => {
  //   console.log("width: ", width * debouncedScale);
  //   console.log("height: ", height * debouncedScale);
  // }, [debouncedScale, width, height]);

  // Dynamic styles that can't be expressed with Tailwind
  const gridContainerStyle: React.CSSProperties = {
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    gap: `${gridPadding * debouncedScale}px`,
    padding: `${gridPadding * debouncedScale}px`,
    width: `${width * debouncedScale}px`,
    height: `${height * debouncedScale}px`,
    transformOrigin: "top left",
    visibility: isClient ? "visible" : "hidden",
  };

  const cellStyle: React.CSSProperties = {
    fontSize: `${Math.max(10, 12 * debouncedScale)}px`,
  };

  return (
    <div className="w-full h-[90vh] flex flex-col items-center justify-start py-[100px] overflow-hidden bg-[#f8f8f8]">
      <div
        className="grid bg-[#f0f0f0]  transition-all duration-300 ease-out box-border"
        style={gridContainerStyle}
      >
        {Array.from({ length: rows * cols }).map((_, i) => (
          <div
            key={i}
            className="relative bg-gray-50 flex items-center justify-center box-border transition-all duration-300 ease-out group border border-dashed border-gray-200"
            style={cellStyle}
          >
            {/* File input */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleUploadByIndex(e, i)}
              className="absolute opacity-0 cursor-pointer z-10 w-full h-full"
              title=""
            />

            {uploadedFiles[i]?.image ? (
              <div className="relative w-full h-full ">
                <Image
                  src={uploadedFiles[i].image}
                  alt={`Uploaded content ${i}`}
                  fill
                  className="object-cover transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-black/0  transition-all duration-300 flex items-center justify-center opacity-0 ">
                  <Pencil className="w-6 h-6 text-white" />
                </div>
              </div>
            ) : (
              <div className="hidden xs:flex flex-col items-center justify-center p-6 text-center">
                <div className="p-3 mb-2 rounded-full bg-[#1aac83]/10  transition-colors duration-200">
                  <UploadCloud className="      h-4 w-4    sm:w-6           sm:h-6  text-[#1aac83]" />
                </div>
                {/* <p className=" hidden xs:block  sm:text-xs text-gray-400">
                  Upload an image
                </p> */}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollageLayout;
