"use client";

import { useState, useEffect } from "react";
import CollageSidebar from "./components/CollageSidebar";
import CollageLayout from "./components/CollageLayout";
import { CollageTemplate, PROFESSIONAL_TEMPLATES } from "./utils/templates";
import { TemplateInfo } from "./components/TemplateInfo";
import { ColorResult } from "@uiw/react-color";
import { useCollage } from "@/hooks/useCollage";

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

const CollageClient = () => {
  const [template, setTemplate] = useState<string>(templates[0].value);
  const [selectedTemplate, setSelectedTemplate] = useState<CollageTemplate>(
    PROFESSIONAL_TEMPLATES[template]
  );
  const { rows, cols } = selectedTemplate;

  const [gridPadding, setGridPadding] = useState<number>(
    selectedTemplate.cellPadding || 3
  );
  const [uploadedFiles, setUploadedFiles] = useState<
    { file: File; image: string }[]
  >(Array(rows * cols).fill(null));

  // submit collage
  const { mutate: mutateCollage, isPending: isPendingCollage } = useCollage();
  const formData = new FormData();

  // sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // color picker
  const templateBgColor =
    typeof selectedTemplate.backgroundColor === "string"
      ? selectedTemplate.backgroundColor.startsWith("#")
        ? selectedTemplate.backgroundColor
        : `#${selectedTemplate.backgroundColor}`
      : selectedTemplate.backgroundColor
      ? `rgba(${selectedTemplate.backgroundColor.r}, ${
          selectedTemplate.backgroundColor.g
        }, ${selectedTemplate.backgroundColor.b}, ${
          selectedTemplate.backgroundColor.alpha || 1
        })`
      : "#ffffff";
  const [activeColor, setActiveColor] = useState<string>(templateBgColor);

  useEffect(() => {
    setSelectedTemplate(PROFESSIONAL_TEMPLATES[template]);
  }, [template]);

  useEffect(() => {
    setActiveColor(templateBgColor);
  }, [template, templateBgColor]);

  // useEffect(() => {
  //   console.log(template, PROFESSIONAL_TEMPLATES[template].backgroundColor);
  // }, [template]);

  const handleColorChange = (color: ColorResult) => {
    setActiveColor(color.hex);
  };

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      // Na desktopu uvek otvoren sidebar, na mobilu uvek zatvoren
      setIsSidebarOpen(!mobile);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const submitCollage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    uploadedFiles.forEach(({ file }) => formData.append("files", file));
    formData.append("templateName", template);
    formData.append("customPadding", gridPadding.toString());
    formData.append("backgroundColor", activeColor);

    mutateCollage(formData, {
      onSuccess: (response) => {
        console.log("Collage response ===> ", response);
      },
      onError: (error) => {
        console.log("Collage error ===> ", error);
      },
    });
  };

  return (
    <div className="flex flex-col lg:flex-row h-[90vh] bg-gray-100">
      {/* Sidebar - fiksna širina 300px, apsolutno pozicioniran na desktopu */}
      <div
        className={`
    ${isMobile ? "fixed z-40" : "relative"}
    ${isSidebarOpen ? "w-[300px]" : "w-0"}
    h-[90vh]
    transition-all duration-300
  `}
      >
        <form onSubmit={submitCollage}>
          <CollageSidebar
            isOpen={isSidebarOpen}
            isMobile={isMobile}
            templates={templates}
            template={template}
            gridPadding={gridPadding}
            templateBgColor={templateBgColor}
            activeColor={activeColor}
            handleColorChange={handleColorChange}
            setGridPadding={setGridPadding}
            setTemplate={setTemplate}
            onClose={toggleSidebar}
          />
        </form>
      </div>

      {/* Main Content - direktno dolepo sidebaru na desktopu */}
      <div
        className={`
    h-[90vh]
    flex-grow
    transition-all duration-300
    ${isSidebarOpen ? "lg:w-[calc(100%-300px)]" : "w-full"}
    ${isMobile ? "ml-0" : ""}
  `}
      >
        <TemplateInfo
          template={selectedTemplate}
          gridPadding={gridPadding}
          backgroundColor={activeColor}
        />
        {/* <div className="h-full w-full"> */}
        <CollageLayout
          backgroundColor={activeColor}
          templateName={template}
          gridPadding={gridPadding}
          uploadedFiles={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
        />
        {/* </div> */}
      </div>
    </div>
  );
};

export default CollageClient;
