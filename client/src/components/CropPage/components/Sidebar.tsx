import { Dropdown } from "primereact/dropdown";
import { ToggleButton } from "primereact/togglebutton";
import { Dispatch, SetStateAction } from "react";
import { SelectButton } from "primereact/selectbutton";
import { InputSwitch } from "primereact/inputswitch";

import {
  LayoutPanelLeft,
  Grid,
  Crop,
  Circle,
  RectangleHorizontal,
  Square,
  ArrowLeft,
  Move,
  Ruler,
  ArrowLeftRight,
  ArrowUpDown,
  ChevronLeft,
} from "lucide-react";
import { Button } from "primereact/button";

type SidebarProps = {
  sidebarOpen: boolean;
  options: string[];
  rounded: {
    width: number;
    height: number;
    top: number;
    left: number;
  } | null;
  aspectRatios: { value: number | boolean; name: string }[];
  ratio: number | boolean;
  stencilValue: "rectangle" | "circle";
  handlersValue: string;
  isGridActive: boolean;
  setIsGridActive: Dispatch<SetStateAction<boolean>>;
  setRatio: Dispatch<SetStateAction<number | boolean>>;
  toggleStencil: () => void;
  toggleSidebar: () => void;
  setHandlersValue: (value: string) => void;
  cancelCrop: () => void;
};

const Sidebar = ({
  options,
  ratio,
  isGridActive,
  rounded,
  stencilValue,
  aspectRatios,
  sidebarOpen,
  handlersValue,
  setRatio,
  setIsGridActive,
  toggleStencil,
  toggleSidebar,
  setHandlersValue,
  cancelCrop,
}: SidebarProps) => {
  return (
    <aside
      className={`h-[90vh] flex flex-col fixed top-20 left-0 w-[270px] xs:w-[350px] bg-white p-6 z-40 
  transform transition-all duration-300 ease-in-out shadow-lg
  ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
  lg2:static lg2:transform-none lg2:translate-x-0
  border-r border-solid border-gray-100`}
    >
      {/* Header */}
      <div className="w-full flex items-center justify-between pb-2 border-b border-gray-200">
        <h2 className="font-bold text-xl text-[#1aac83] saira-font">
          Crop Settings
        </h2>
        <button
          onClick={toggleSidebar}
          type="button"
          className="lg2:hidden p-1 hover:bg-gray-100 rounded-full"
          aria-label="Close sidebar"
        >
          <ChevronLeft className="w-5 h-5 text-[#1aac83]" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-8">
        {/* Aspect Ratio */}
        <section className="space-y-3 pt-7">
          <div className="flex items-center gap-2">
            <RectangleHorizontal className="text-[#1aac83]" size={18} />
            <label className="font-medium text-gray-700 saira-font">
              Aspect Ratio
            </label>
          </div>
          <Dropdown
            value={ratio}
            onChange={(e) => setRatio(e.value)}
            options={aspectRatios}
            optionLabel="name"
            placeholder="Select Ratio"
            className="w-full border-gray-300"
          />
        </section>

        {/* Crop Shape */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Crop className="text-[#1aac83]" size={18} />
            <label className="font-medium text-gray-700 saira-font">
              Crop Shape
            </label>
          </div>
          <SelectButton
            value={stencilValue}
            onChange={toggleStencil}
            options={[
              {
                icon: <Square size={16} className="mr-2" />,
                label: "Rectangle",
                value: "rectangle",
              },
              {
                icon: <Circle size={16} className="mr-2" />,
                label: "Circle",
                value: "circle",
              },
            ]}
            optionLabel="label"
            className="w-full border-gray-300"
          />
        </section>

        {/* Coordinates */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Ruler className="text-[#1aac83]" size={18} />
            <label className="font-medium text-gray-700 saira-font">
              Dimensions
            </label>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 grid grid-cols-2 gap-4 text-sm">
            {[
              {
                icon: <ArrowLeftRight size={14} />,
                label: "Width",
                value: rounded?.width,
              },
              {
                icon: <ArrowUpDown size={14} />,
                label: "Height",
                value: rounded?.height,
              },
              {
                icon: <Move size={14} />,
                label: "X Position",
                value: rounded?.left,
              },
              {
                icon: <Move className="rotate-90" size={14} />,
                label: "Y Position",
                value: rounded?.top,
              },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className="text-gray-500">{item.icon}</span>
                <div>
                  <div className="text-xs text-gray-500">{item.label}</div>
                  <div className="font-semibold">{item.value ?? "--"}px</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-row  gap-8">
          <div className="flex gap-3  flex-col w-fit ">
            {/* Leva kolona sa ikonom + labelom - fiksna širina */}
            <div className="flex items-center gap-2">
              <Grid className="text-[#1aac83]" size={18} />
              <label className="font-medium text-gray-700 saira-font">
                Grid Overlay
              </label>
            </div>
            {/* Desni kontrolni element */}
            <ToggleButton
              checked={isGridActive}
              onChange={(e) => setIsGridActive(e.value)}
              onLabel="ON"
              offLabel="OFF"
              className="border-gray-300"
            />
          </div>

          <div className="flex gap-3 items-center flex-col">
            {/* Leva kolona sa ikonom + labelom - ista fiksna širina */}
            <div className="flex items-center gap-2 ">
              <Move size={18} className="text-[#1aac83]" />
              <label className="font-medium text-gray-700 saira-font">
                Handlers
              </label>
            </div>
            {/* Desni kontrolni element */}
            <InputSwitch
              className="mt-2"
              checked={handlersValue === "on"}
              onChange={(e) => setHandlersValue(e.value ? "on" : "off")}
            />
          </div>
        </section>
        <section></section>
      </div>

      {/* Apply Crop Button */}
      <div className="border-t border-gray-200 pt-4">
        <button
          type="submit"
          className="cursor-pointer w-full bg-[#1aac83] hover:bg-[#169b76] transition-colors py-2.5 px-4 rounded-md text-white font-medium text-sm saira-font flex items-center justify-center gap-2"
        >
          <Crop className="w-4 h-4" />
          Apply Crop
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
