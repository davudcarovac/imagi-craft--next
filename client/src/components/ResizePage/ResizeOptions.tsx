import { ResizeOptionsType } from "../../types/types";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { ToggleButton } from "primereact/togglebutton";

const ResizeOptions = ({
  selectFit,
  fit,
  isActiveAR,
  handleChangeImageOptions,
  imageOptions,
  toggleAspectRatio,
  resetOptions,
}: ResizeOptionsType) => {
  return (
    <div className="max-w-[800px] mx-auto p-4 sm:p-6">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 sm:p-6">
        {/* Main controls group */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* First column - Dimensions and Fit */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Dimensions */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Image Size
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <InputText
                    onChange={handleChangeImageOptions}
                    value={imageOptions.width.toString()}
                    className="no-spinner w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    id="width"
                    placeholder="Width"
                    type="number"
                    min="1"
                  />
                </div>
                <div className="flex-1">
                  <InputText
                    onChange={handleChangeImageOptions}
                    value={imageOptions.height.toString()}
                    className="no-spinner w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    id="height"
                    placeholder="Height"
                    type="number"
                    min="1"
                  />
                </div>
              </div>
            </div>

            {/* Fit option */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Resize Mode
              </label>
              <Dropdown
                options={[
                  { value: "cover", label: "Cover (fill area)" },
                  { value: "contain", label: "Contain (fit inside)" },
                  { value: "fill", label: "Fill (stretch)" },
                  { value: "inside", label: "Inside (preserve ratio)" },
                  { value: "outside", label: "Outside (extend bounds)" },
                ]}
                value={fit}
                defaultValue="cover"
                onChange={selectFit}
                className="w-full"
              />
            </div>
          </div>

          {/* Second column - Aspect ratio and Reset */}
          <div className="flex flex-col justify-between gap-4">
            {/* Aspect ratio */}
            <div className="space-y-2">
              <label
                className="
               text-sm font-medium text-gray-700 flex items-center justify-between"
              >
                <span>Maintain Aspect Ratio</span>
                <ToggleButton
                  checked={isActiveAR}
                  onChange={toggleAspectRatio}
                  className="ml-2 my-custom-toggle"
                />
              </label>
              <p className="text-xs text-gray-500">
                Automatically preserves original width/height ratio
              </p>
            </div>

            {/* Reset button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={resetOptions}
                className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-300 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              >
                Reset Settings
              </button>
            </div>
          </div>
        </div>

        {/* Additional options can go here */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          {/* Space for additional options */}
        </div>
      </div>
    </div>
  );
};

export default ResizeOptions;
