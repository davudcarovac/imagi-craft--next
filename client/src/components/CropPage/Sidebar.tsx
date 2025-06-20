import { Dropdown } from "primereact/dropdown";
import { ToggleButton } from "primereact/togglebutton";
import { Dispatch, SetStateAction } from "react";
import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton";
import sidebarArrow from "../../assets/button images/sidebar-arrow-left.png";
import Image from "next/image";

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
      fixed top-20 left-0 max-w-[350px] bg-gray-100 p-4 z-40 
      transform transition-transform duration-300 ease-in-out
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      lg2:static lg2:transform-none lg2:translate-x-0
       w-full lg2:w-[350px]
    `}
    >
      <div className="flex flex-col gap-3">
        <div className="w-full flex items-center justify-center relative">
          <h2 className="font-semibold text-2xl  mb-4 ">Options</h2>
          <button
            type="button"
            onClick={toggleSidebar}
            className="lg2:hidden absolute right-0 bottom-5 cursor-pointer"
          >
            <Image
              src={sidebarArrow}
              alt="sidebar-close"
              height={25}
              width={25}
            />
          </button>
        </div>
        {/* Aspect ratio */}
        <div>
          <div>
            <h2 className="text-[#1aac83] text-lg">Aspect ratio</h2>

            <div className="pt-2">
              <Dropdown
                value={ratio}
                onChange={(e) => setRatio(e.value)}
                options={aspectRatios}
                optionLabel="name"
                placeholder="Select a City"
                className="w-full md:w-14rem"
                style={{ width: "240px" }}
              />
            </div>
          </div>
        </div>
        {/* Stencil */}
        <div className="py-5">
          <h2 className="text-[#1aac83] text-lg">Stencil </h2>
          <div className="flex items-center flex-row gap-5 pt-2">
            <button
              onClick={toggleStencil}
              type="button"
              className={`
                        
                        ${
                          stencilValue !== "rectangle" &&
                          " border borde-solid border-[#1aac83] "
                        }  ${
                stencilValue === "rectangle" ? "bg-[#1aac83]" : "bg-transparent"
              }  
                       ${
                         stencilValue === "rectangle"
                           ? "text-white"
                           : "text-[#1aac83]"
                       }
                      py-2 px-4 cursor-pointer rounded-sm`}
            >
              Rectangle
            </button>
            <button
              onClick={toggleStencil}
              type="button"
              className={`${
                stencilValue !== "circle" &&
                "border border-solid border-[#1aac83]"
              }   ${
                stencilValue === "circle" ? "bg-[#1aac83]" : "bg-transparent"
              }
                      
                       ${
                         stencilValue === "circle"
                           ? "text-white"
                           : "text-[#1aac83]"
                       }
                      py-2 px-4  cursor-pointer rounded-sm  `}
            >
              {" "}
              Circle
            </button>
          </div>
        </div>

        {/* Coordinates */}
        <div>
          <h2 className="text-[#1aac83] text-lg">Coordinates</h2>
          <div className="w-[240px] flex flex-col  gap-2 p-3 bg-white rounded-lg mt-2 border border-solid border-gray-300">
            <div>
              <p>Width: {rounded?.width}</p>
            </div>
            <div>
              <p>Height: {rounded?.height}</p>
            </div>
            <div>
              <p>X: {rounded?.left}</p>
            </div>{" "}
            <div>
              <p>Y: {rounded?.top}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center flex-row gap-5">
          {/* Handlers */}
          <div className="py-3">
            <h2 className="text-[#1aac83] text-lg">Handlers</h2>
            <div className="flex align-items-center py-2">
              <SelectButton
                value={handlersValue}
                onChange={(e: SelectButtonChangeEvent) =>
                  setHandlersValue(e.value)
                }
                options={options}
              />
            </div>
          </div>

          {/* Grid */}
          <div>
            <h2 className="text-[#1aac83] text-lg">Grid</h2>

            <ToggleButton
              onLabel="On"
              offLabel="Off"
              onIcon="pi pi-check"
              offIcon="pi pi-times"
              checked={isGridActive}
              onChange={(e) => setIsGridActive(e.value)}
              className="w-9rem py-3 my-custom-toggle"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <button className="className={`mt-4 py-5 px-16 bg-[#1aac83] text-white rounded-lg text-xl cursor-pointer">
          {" "}
          Crop Image
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
