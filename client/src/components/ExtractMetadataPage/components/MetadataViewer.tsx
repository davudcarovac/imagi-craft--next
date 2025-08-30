"use client";

import CustomMessage from "@/components/CustomMessage";
import React, { useEffect } from "react";

type MetadataProps = {
  metadata: {
    metadata: Record<string, any>;
    readOnly: Record<string, any>;
    filename: string;
  };
  onMetadataChange: (updated: Record<string, any>) => void;
  showMetadata?: null | "readOnly" | "edit";
  changedMetadata: Record<string, any>;
  setChangedMetadata: React.Dispatch<React.SetStateAction<Record<string, any>>>;
};

export default function MetadataViewer({
  metadata,
  onMetadataChange,
  showMetadata,
  changedMetadata,
  setChangedMetadata,
}: MetadataProps) {
  // 🔑 samo polja koja su promenjena
  // const [changedMetadata, setChangedMetadata] = useState<Record<string, any>>(
  //   {}
  // );

  const handleEditableChange = (key: string, value: string) => {
    // update changed values
    setChangedMetadata((prev) => ({
      ...prev,
      [key]: value,
    }));

    // update prikaz odmah
    onMetadataChange({
      ...metadata,
      metadata: { ...metadata.metadata, [key]: value },
    });
  };

  useEffect(() => console.log(changedMetadata), [changedMetadata]);

  function formatMetadataValue(value: any): string {
    if (value == null) return "";

    if (typeof value === "object" && "rawValue" in value) {
      return (value as any).rawValue;
    }

    if (Array.isArray(value)) {
      return value.join(", ");
    }

    return String(value);
  }

  return (
    <div>
      <h2 className="text-center my-5 saira-font text-3xl text-[#1aac83] font-semibold">
        Image Metadata
      </h2>

      {showMetadata === "edit" && (
        <section className="mb-8">
          <CustomMessage
            closable={true}
            severity="info"
            summary="Data modification"
            detail="Be careful with changing image metadata, not all data is recommended to change."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(metadata.metadata || {}).map(([key, value]) => (
              <div
                key={key}
                className="flex flex-col sm:flex-row sm:items-center justify-between bg-white px-4 py-3 rounded-md shadow-sm"
              >
                <label className="font-medium text-gray-600 mb-2 sm:mb-0 sm:mr-4 sm:w-1/3">
                  {key}:
                </label>
                <input
                  type="text"
                  value={formatMetadataValue(value) ?? ""}
                  onChange={(e) => handleEditableChange(key, e.target.value)}
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#1aac83] focus:border-[#1aac83]"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {showMetadata === "readOnly" && (
        <section>
          <h3 className="py-5 text-gray-800 saira-font font-semibold text-2xl">
            Read only
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(metadata.readOnly || {}).map(([key, value]) => (
              <div
                key={key}
                className="flex flex-col sm:flex-row sm:items-center justify-between bg-white px-4 py-3 rounded-md shadow-sm"
              >
                <label className="font-medium text-gray-600 mb-2 sm:mb-0 sm:mr-4 sm:w-1/3">
                  {key}:
                </label>
                <p>{formatMetadataValue(value)}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* samo za debug */}
      {showMetadata === "edit" && (
        <pre className="mt-4 bg-gray-100 p-2 rounded">
          {JSON.stringify(changedMetadata, null, 2)}
        </pre>
      )}
    </div>
  );
}
