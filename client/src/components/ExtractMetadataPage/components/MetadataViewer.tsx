"use client";

import React from "react";

type MetadataProps = {
  metadata: {
    readOnly: Record<string, any>;
    editable: Record<string, any>;
    fullData?: Record<string, any>;
  };
  onMetadataChange: (updated: Record<string, any>) => void;
};

export default function MetadataViewer({
  metadata,
  onMetadataChange,
}: MetadataProps) {
  const handleEditableChange = (key: string, value: string) => {
    const updatedEditable = { ...metadata.editable, [key]: value };
    onMetadataChange({ ...metadata, editable: updatedEditable });
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2 className="saira-font text-2xl text-[#1aac83] font-semibold">
        Image Metadata
      </h2>

      {/* Read-Only podaci */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
          Read-Only Metadata
        </h3>
        <div className="space-y-2">
          {Object.entries(metadata.readOnly || {}).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-md shadow-sm"
            >
              <span className="font-medium text-gray-600">{key}</span>
              <span className="text-gray-800">{String(value)}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
          Editable Metadata
        </h3>
        <div className="space-y-3">
          {Object.entries(metadata.editable || {}).map(([key, value]) => (
            <div
              key={key}
              className="flex items-center justify-between bg-white px-4 py-2 rounded-md shadow-sm"
            >
              <label className="font-medium text-gray-600 mr-4 w-1/3">
                {key}:
              </label>
              <input
                type="text"
                value={value ?? ""}
                onChange={(e) => handleEditableChange(key, e.target.value)}
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}
        </div>
      </section>

      {/* FullData prikaz (opciono, npr. debug) */}
      {/* {metadata.fullData && (
        <section>
          <h3>Full Metadata (Debug)</h3>
          <pre style={{ background: "#f4f4f4", padding: "10px" }}>
            {JSON.stringify(metadata.fullData, null, 2)}
          </pre>
        </section>
      )} */}
    </div>
  );
}
