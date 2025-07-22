"use client";

import { useState, useEffect, useRef } from "react";
import CollageSidebar from "./components/CollageSidebar";
import CollageLayout from "./components/CollageLayout";
import { CollageTemplate, PROFESSIONAL_TEMPLATES } from "./utils/templates";
import { TemplateInfo } from "./components/TemplateInfo";
import { ColorResult } from "@uiw/react-color";
import { useCollage } from "@/hooks/useCollage";
import DownloadArea from "../DownloadArea";
import LetsTryActions from "../LetsTryActions/LetsTryActions";
import { deleteAllFiles } from "@/api/deleteAllApi";
import { Toast } from "primereact/toast";

const templates = [
  { value: "CLASSIC", name: "2x2" },
  { value: "PRINT_POSTER", name: "A4 Poster" },
  { value: "INSTAGRAM_GRID", name: "Instagram grid" },
  { value: "PINTEREST_PIN", name: "Pinterest pin" },
  { value: "INSTAGRAM_STORY", name: "Instagram Story Split" },
  { value: "PHOTO_BOOTH", name: "Photo Booth Strip" },
  { value: "BEFORE_AFTER", name: "Before / After" },
  { value: "MAGAZINE_SPREAD", name: "Magazine spread" },
  { value: "YOUTUBE_THUMBNAIL", name: "YouTube Thumbnail" },
  { value: "FACEBOOK_EVENT", name: "Facebook Event Cover" },
  { value: "TWITTER_THREAD", name: "Twitter Thread" },
  { value: "LINKEDIN_CAROUSEL", name: "LinkedIn Carousel" },
  { value: "PORTFOLIO_SHOWCASE", name: "Portfolio Showcase" },
];

const CollageClient = () => {
  const [template, setTemplate] = useState<string>(templates[0].value);
  const [downloadItem, setDownloadItem] = useState<string | null>(null);
  const toast = useRef<Toast>(null);

  const [selectedTemplate, setSelectedTemplate] = useState<CollageTemplate>(
    PROFESSIONAL_TEMPLATES[template]
  );
  const { rows, cols } = selectedTemplate;
  const [borderRadius, setBorderRadius] = useState<number>(0);
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
    setUploadedFiles(Array(rows * cols).fill(null));
  }, [template, templateBgColor]);

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
    formData.append("borderRadius", borderRadius.toString());

    mutateCollage(formData, {
      onSuccess: (response) => {
        if (
          response?.success &&
          response.downloadLinks &&
          response.downloadLinks?.length > 0
        ) {
          setDownloadItem(String(response?.downloadLinks[0].name));
          setTemplate(templates[0].value);
          setUploadedFiles(Array(rows * cols).fill(null));
          toast.current?.show({
            severity: "success",
            summary: "Collage succed",
            detail: response.message,
            life: 4000,
          });
        }
      },
      onError: (error) => {
        console.log("Collage error ===> ", error);
        toast.current?.show({
          severity: "error",
          summary: "Collage failed",
          detail: error.message,
          life: 4000,
        });
      },
    });
  };

  useEffect(() => {
    return () => {
      uploadedFiles.forEach((item) => {
        if (item?.image) {
          if (item.image.startsWith("blob:")) {
            URL.revokeObjectURL(item.image);
          }
        }
      });
    };
  }, [uploadedFiles]);

  const resetAll = () => {
    setDownloadItem(null);
    setUploadedFiles(Array(rows * cols).fill(null));
    setTemplate(templates[0].value);
    setActiveColor(templateBgColor);
    setBorderRadius(0);
    setGridPadding(selectedTemplate.cellPadding || 3);
  };

  const deleteAll = () => {
    try {
      deleteAllFiles();
      resetAll();
    } catch (error) {
      console.log("This is Error ===> ", error);
    }
  };

  return (
    <div>
      <Toast ref={toast} />
      {!downloadItem && (
        <div className="flex flex-col lg:flex-row h-[90vh] bg-gray-100">
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
                borderRadius={borderRadius}
                uploadedFiles={uploadedFiles}
                setUploadedFiles={setUploadedFiles}
                setBorderRadius={setBorderRadius}
                handleColorChange={handleColorChange}
                setGridPadding={setGridPadding}
                setTemplate={setTemplate}
                onClose={toggleSidebar}
              />
            </form>
          </div>

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
              radius={borderRadius}
            />
            <CollageLayout
              backgroundColor={activeColor}
              templateName={template}
              gridPadding={gridPadding}
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
              radius={borderRadius}
            />
          </div>
        </div>
      )}

      {downloadItem && (
        <div>
          <div className="max-w-[700px] mx-auto flex justify-center flex-col py-10  ">
            <DownloadArea
              handleDisableLink={null}
              downloadLinks={[]}
              isSingle={true}
              text="You image has been cropped. Download it!"
              resetAll={resetAll}
              deleteAll={deleteAll}
              downloadItem={downloadItem}
            />
            {/* Let's try */}
          </div>
          <LetsTryActions />
        </div>
      )}
    </div>
  );
};

export default CollageClient;
