"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { PROFESSIONAL_TEMPLATES } from "./utils/templates";
import { FileUpload, FileUploadHandlerEvent } from "primereact/fileupload";
import { UploadCloud } from "lucide-react"; // koristiš iz 'lucide-react'
import { Slider } from "primereact/slider";
import { Dropdown } from "primereact/dropdown";
import SubmitButton from "../SubmitButton";
import { useCollage } from "@/hooks/useCollage";
import { ColorPicker, ColorPickerChangeEvent } from "primereact/colorpicker";

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

export default function CollageClient() {
  const { mutate: mutateCollage, isPending: isPendingCollage } = useCollage();
  const [images, setImages] = useState<string[]>([]);
  const [template, setTemplate] = useState<keyof typeof PROFESSIONAL_TEMPLATES>(
    templates[0].value
  );
  const [selectedTemplateKey, setSelectedTemplateKey] = useState<
    keyof typeof PROFESSIONAL_TEMPLATES
  >(templates[0].value);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const selectedTemplate = PROFESSIONAL_TEMPLATES[template];
  const containerRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState(100);
  const [gridPadding, setGridPadding] = useState<number>(
    selectedTemplate.cellPadding || 3
  ); // početni padding
  const formData = new FormData();
  const [color, setColor] = useState<string>("");

  useEffect(() => {
    function updateCellSize() {
      if (!containerRef.current) return;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const horizontalPadding =
        (selectedTemplate.cols - 1) * (selectedTemplate.cellPadding ?? 0);
      const verticalPadding =
        (selectedTemplate.rows - 1) * (selectedTemplate.cellPadding ?? 0);

      // Maksimalne dozvoljene dimenzije grida
      const maxGridWidth = viewportWidth * 0.85;
      const maxGridHeight = viewportHeight * 0.75;

      // Potencijalne veličine ćelija u oba smera
      const maxCellWidth =
        (maxGridWidth - horizontalPadding) / selectedTemplate.cols;
      const maxCellHeight =
        (maxGridHeight - verticalPadding) / selectedTemplate.rows;

      const finalCellSize = Math.floor(Math.min(maxCellWidth, maxCellHeight));

      setCellSize(finalCellSize);
    }

    updateCellSize();
    window.addEventListener("resize", updateCellSize);
    return () => window.removeEventListener("resize", updateCellSize);
  }, [selectedTemplate]);

  const [uploadedFiles, setUploadedFiles] = useState<
    { file: File; image: string }[]
  >(Array(selectedTemplate.rows * selectedTemplate.cols).fill(null));

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

  const onUpload = (event: FileUploadHandlerEvent) => {
    const newImages = event.files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImages]);
  };

  const totalGridWidth =
    cellSize * selectedTemplate.cols +
    (selectedTemplate.cols - 1) * gridPadding;
  const totalGridHeight =
    cellSize * selectedTemplate.rows +
    (selectedTemplate.rows - 1) * gridPadding;

  const submitCollage = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent
  ) => {
    e.preventDefault();
    console.log(uploadedFiles);
    uploadedFiles.forEach(({ file }) => formData.append("files", file));
    formData.append("templateName", template);
    formData.append("customPadding", JSON.stringify(gridPadding));

    mutateCollage(formData, {
      onSuccess: (response) => {
        console.log("Response collage ===> ", response);
      },
      onError: (error) => {
        console.log("Error collage ===> ", error);
      },
    });
  };

  useEffect(() => {
    const totalSlots = selectedTemplate.rows * selectedTemplate.cols;
    setUploadedFiles(Array(totalSlots).fill(null));
  }, [selectedTemplate]);

  const resolveBackgroundColor = (
    bg: string | { r: number; g: number; b: number; alpha?: number } | undefined
  ) => {
    if (!bg) return "#ffffff";
    if (typeof bg === "string") return bg;

    const { r, g, b, alpha } = bg;
    return `rgba(${r}, ${g}, ${b}, ${alpha ?? 1})`;
  };

  return (
    <div className="flex min-h-screen overflow-hidden" ref={containerRef}>
      {/* Sidebar */}
      <aside
        className={`
    fixed top-0 left-0 z-40 min-h-screen w-72 bg-white p-6 shadow-lg transition-transform duration-300 ease-in-out
    transform
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    lg2:translate-x-0
    lg2:relative
    lg2:top-0
    top-20
  `}
      >
        <h1 className="text-2xl font-semibold mb-6 text-[#1aac83]">
          Collage options
        </h1>
        <form onSubmit={submitCollage}>
          <div className="mb-8">
            <label
              htmlFor="image-upload"
              className="block mb-2 text-[#1aac83] font-medium text-lg"
            >
              Upload images
            </label>

            <FileUpload
              className="custom-file-upload font-medium "
              multiple
              mode="basic"
              id="image-upload"
              accept="image/*"
              customUpload
              uploadHandler={onUpload}
              // maxFileSize={1000000}
              // onUpload={onUpload}
              auto
              chooseLabel="Browse"
            />
          </div>

          {/* Zatvori dugme - vidi se samo na manjim ekranima */}
          <button
            className="lg2:hidden absolute top-4 right-4 p-2 rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none"
            onClick={() => setSidebarOpen(false)}
            aria-label="Zatvori sidebar"
          >
            ✕
          </button>

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
              max={20}
              step={1}
              className="w-full"
            />
          </div>
          <div className="my-6">
            <label className="block mb-2 text-[#1aac83] text-lg font-medium">
              Background color:
            </label>
            <ColorPicker
              value={color}
              onChange={(e: ColorPickerChangeEvent) =>
                setColor(e.value as string)
              }
            />
          </div>
          <div>
            <SubmitButton isPending={isPendingCollage}>Submit</SubmitButton>
          </div>
        </form>
      </aside>

      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="top-25 left-5 absolute cursor-pointer  p-2 h-auto  bg-[#1aac83] rounded-md"
        >
          <i className="pi pi-cog" style={{ color: "white" }}></i>
        </button>
      )}

      <div className="flex justify-center items-center flex-col w-screen">
        <div className="w-[70%] my-6 p-5 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
          <h2 className="text-2xl font-semibold text-[#1aac83] mb-4 border-b border-slate-100 pb-2 saira-font">
            Layout Details
          </h2>

          <div className="grid grid-cols-2 gap-x-5 gap-y-1 text-sm text-slate-700">
            <div className="space-y-1">
              <p className="font-medium text-slate-600">
                Dimensions: {selectedTemplate.width} × {selectedTemplate.height}
                px
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-slate-600">
                Columns: {selectedTemplate.cols}
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-slate-600">
                Rows: {selectedTemplate.rows}
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-slate-600">
                Total Slots: {selectedTemplate.rows * selectedTemplate.cols}
              </p>
            </div>

            <div className="space-y-1">
              <p className="font-medium text-slate-600">
                Cell Padding: {gridPadding}px
              </p>
            </div>
          </div>
        </div>
        <main
          className="flex-1 overflow-auto flex justify-center items-center flex-col gap-5 max-w-screen"
          style={{ padding: 20 }}
        >
          <div
            style={{
              width: totalGridWidth,
              height: totalGridHeight,
              display: "grid",
              gridTemplateColumns: `repeat(${selectedTemplate.cols}, ${cellSize}px)`,
              gridTemplateRows: `repeat(${selectedTemplate.rows}, ${cellSize}px)`,
              gap: gridPadding,
              margin: "0 auto",
              // borderRadius: 8,
              overflow: "hidden",
              backgroundColor: resolveBackgroundColor(
                selectedTemplate.backgroundColor
              ),
            }}
          >
            {Array.from({
              length: selectedTemplate.rows * selectedTemplate.cols,
            }).map((_, i) => {
              const src = uploadedFiles[i]?.image;

              return (
                <div
                  key={i}
                  className="relative bg-white overflow-hidden group  transition"
                  style={{ width: cellSize, height: cellSize }}
                >
                  {/* File input (nevidljiv ali preko celog kvadrata) */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleUploadByIndex(e, i)}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    title=""
                  />

                  {/* Slika ako postoji */}
                  {src ? (
                    <Image
                      src={src}
                      alt={`img-${i}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    // Ikonica ako nema slike
                    <div className="flex items-center flex-col justify-center h-full w-full text-gray-400 group-hover:text-[#1aac83] transition-colors duration-200">
                      <UploadCloud className="w-7 h-7 text-[#1aac83]" />
                      <p className="text-sm text-[#1aac83]">Upload a image</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
