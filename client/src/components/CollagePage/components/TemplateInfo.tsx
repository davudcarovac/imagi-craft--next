// components/TemplateInfo.tsx
"use client";

import {
  Ruler,
  LayoutGrid,
  Droplet,
  ZoomIn,
  Info,
  SquareRoundCorner,
} from "lucide-react";
import { CollageTemplate } from "../utils/templates";

interface TemplateInfoProps {
  template: CollageTemplate;
  className?: string;
  backgroundColor?: string;
  gridPadding?: number;
  radius: number;
}

export const TemplateInfo = ({
  template,
  className,
  backgroundColor,
  gridPadding,
  radius,
}: TemplateInfoProps) => {
  const getBackgroundColor = () => {
    if (!template.backgroundColor) return undefined;

    if (typeof template.backgroundColor === "string") {
      return template.backgroundColor.startsWith("#")
        ? template.backgroundColor
        : `#${template.backgroundColor}`;
    } else {
      const { r, g, b, alpha = 1 } = template.backgroundColor;
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
  };

  return (
    <div className={`bg-white border-b border-gray-100 shadow-sm ${className}`}>
      <div className="container mx-auto px-5 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Left Section - Template Metadata */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-semibold text-[#1aac83] saira-font">
                {template.name}
              </h2>
              <span className="px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-full whitespace-nowrap">
                {template.rows}×{template.cols} Grid
              </span>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {/* Dimensions */}
              <div className="flex items-center gap-2 text-gray-600">
                <Ruler className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span>
                  {template.width} × {template.height}px
                </span>
              </div>

              {/* Spacing */}
              <div className="flex items-center gap-2 text-gray-600">
                <LayoutGrid className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span>{gridPadding}px spacing</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <SquareRoundCorner className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span>{radius}px </span>
              </div>

              {/* Background Color */}
              {template.backgroundColor && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Droplet className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <div className="flex items-center gap-1.5">
                    <span>Background:</span>
                    <div
                      className="w-4 h-4 rounded-sm border border-gray-200 shadow-inner"
                      style={{ backgroundColor: backgroundColor }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-3">
            {/* Scale Indicator */}
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
              <ZoomIn className="w-5 h-5 text-gray-500 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                Scale:{" "}
                {(template.displayScale
                  ? template.displayScale * 100
                  : 100
                ).toFixed(0)}
                %
              </span>
            </div>

            {/* Info Button */}
            <button
              className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
              aria-label="Template information"
            >
              <Info className="w-5 h-5 text-gray-400 hover:text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
