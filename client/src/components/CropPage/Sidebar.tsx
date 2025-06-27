import { Dropdown } from "primereact/dropdown";
import { ToggleButton } from "primereact/togglebutton";
import { Dispatch, SetStateAction } from "react";
import { SelectButton } from "primereact/selectbutton";

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
  setIsGridActive: React.Dispatch<React.SetStateAction<boolean>>;
  setRatio: Dispatch<SetStateAction<number | boolean>>;
  toggleStencil: () => void;
  toggleSidebar: () => void;
  setHandlersValue: (value: string) => void;
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
}: SidebarProps) => {
  return (
    <div
      className={`
              h-[90vh]   flex justify-between flex-col
      fixed top-20 left-0 max-w-[350px] bg-white p-4 z-40 
      transform transition-transform duration-300 ease-in-out
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      lg2:static lg2:transform-none lg2:translate-x-0
       w-full lg2:w-[350px] border-r border-solid border-slate-200
    `}
    >
      <div className="flex flex-col gap-10 text-[#1aac83]">
        {/* Header */}
        <div className="w-full flex items-center justify-between">
          <h2 className="font-bold text-3xl saira-font">Options</h2>
          <button onClick={toggleSidebar}>
            <i
              className="pi pi-arrow-left cursor-pointer"
              style={{ color: "#1aac83", fontSize: "20px" }}
            ></i>
          </button>
          {/* <button type="button" onClick={toggleSidebar} className="lg2:hidden">
            <Image
              src={sidebarArrow}
              alt="toggle-sidebar"
              height={24}
              width={24}
            />
          </button> */}
        </div>

        {/* Aspect Ratio */}
        <section>
          <label className="block font-medium text-lg mb-2 saira-font">
            Aspect Ratio
          </label>
          <Dropdown
            value={ratio}
            onChange={(e) => setRatio(e.value)}
            options={aspectRatios}
            optionLabel="name"
            placeholder="Select Ratio"
            className="w-full"
          />
        </section>

        {/* Stencil Selection */}
        <section>
          <label className="block font-medium text-lg mb-2 saira-font">
            Stencil Shape
          </label>
          <SelectButton
            value={stencilValue}
            onChange={toggleStencil}
            options={[
              { label: "Rectangle", value: "rectangle" },
              { label: "Circle", value: "circle" },
            ]}
            optionLabel="label"
            className="w-full"
          />
        </section>

        {/* Coordinates */}
        <section>
          <label className="block font-medium text-lg mb-3 text-[#1aac83] saira-font">
            Coordinates
          </label>
          <div className="bg-white border border-gray-300 rounded-lg p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-800">
            <div className="flex flex-col items-center">
              <span className="text-gray-500 text-[17px] font-medium">
                Width
              </span>
              <span className="text-sm font-semibold">{rounded?.width}px</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-gray-500 text-[17px] font-medium">
                Height
              </span>
              <span className="text-sm font-semibold">{rounded?.height}px</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-gray-500 text-[17px] font-medium">X</span>
              <span className="text-sm font-semibold">{rounded?.left}px</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-gray-500 text-[17px] font-medium">Y</span>
              <span className="text-sm font-semibold">{rounded?.top}px</span>
            </div>
          </div>
        </section>

        {/* Handlers & Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium text-lg mb-2 saira-font">
              Handlers
            </label>
            <SelectButton
              value={handlersValue}
              onChange={(e) => setHandlersValue(e.value)}
              options={options}
              className="w-full"
            />
          </div>

          <div>
            <label className="block font-medium text-lg mb-2 saira-font">
              Grid
            </label>
            <ToggleButton
              onLabel="On"
              offLabel="Off"
              onIcon="pi pi-check"
              offIcon="pi pi-times"
              checked={isGridActive}
              onChange={(e) => setIsGridActive(e.value)}
              className="w-full"
            />
          </div>
        </section>

        {/* Crop Button */}
        <div className="flex justify-center pt-4">
          <button className="bg-[#1aac83] hover:bg-[#169b76] transition-colors duration-200 text-white text-lg font-semibold py-3 px-10 rounded-lg shadow-md saira-font">
            Crop Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
