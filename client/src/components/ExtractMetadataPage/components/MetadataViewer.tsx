"use client";

import CustomMessage from "@/components/CustomMessage";
import React, { useEffect } from "react";

type MetadataProps = {
  metadata: {
    metadata: Record<string, any>;
    readOnly: Record<string, any>;
    filename: string;
    // fullData?: Record<string, any>;
    // readOnly: Record<string, any>;
  };
  onMetadataChange: (updated: Record<string, any>) => void;
  showMetadata?: null | "readOnly" | "edit";
};

export default function MetadataViewer({
  metadata,
  onMetadataChange,
  showMetadata,
}: MetadataProps) {
  const handleEditableChange = (key: string, value: string) => {
    onMetadataChange({
      ...metadata,
      metadata: { ...metadata.metadata, [key]: value },
    });
  };

  // useEffect(() => {
  //   console.log("metapodaci ===> ", metadata.metadata);
  // }, [metadata]);

  function formatMetadataValue(value: any): string {
    if (value == null) return "";

    // Ako je ExifDateTime objekat
    if (typeof value === "object" && "rawValue" in value) {
      return (value as any).rawValue;
    }

    // Ako je niz
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

      {/* Read-Only podaci */}
      {/* <section className="mb-8">
      
        <CustomMessage
          severity="info"
          summary="Read only metadata"
          detail="
This data is read-only. Changing them is not recommended."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(metadata.readOnly || {}).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-md shadow-sm"
            >
              <span className="font-medium text-gray-600">{key}</span>
              <span className="text-gray-800">
                {formatMetadataValue(value)}
              </span>
            </div>
          ))}
        </div>
      </section> */}

      {showMetadata === "edit" && (
        <section className="mb-8">
          {/* <h3 className="text-lg font-semibold text-gray-700 mb-4  pb-2">
          Editable Metadata
        </h3> */}

          <CustomMessage
            closable={true}
            severity="info"
            summary="Data modification"
            detail="
Be careful with changing image metadata, not all data is recommended to change."
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

      {/* FullData prikaz (opciono, npr. debug) */}
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
                {/* <input
                  type="text"
                  disabled
                  value={formatMetadataValue(value) ?? ""}
                  onChange={(e) => handleEditableChange(key, e.target.value)}
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#1aac83] focus:border-[#1aac83]"
                /> */}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
