import React from "react";
import { Sidebar } from "primereact/sidebar";
import Image from "next/image";
import Link from "next/link";
import frostyImg from "../assets/frostyImg-transparent.png";
import { usePathname } from "next/navigation";

import servicesIcon from "../assets/action icons/nav/services.png";
// import pricingIcon from "../assets/action icons/nav/credit-card.png";

type MenuSidebarType = {
  isOpen: boolean;
  closeSidebar: () => void;
  navItems: { href: string; label: string }[];
};

const MenuSidebar = ({ navItems, isOpen, closeSidebar }: MenuSidebarType) => {
  const pathname = usePathname();

  return (
    <Sidebar
      visible={isOpen}
      onHide={closeSidebar}
      position="left"
      showCloseIcon={false}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <Link href="/">
          <Image
            src={frostyImg}
            alt="frosty-img-logo"
            height={60}
            width={150}
            className="object-contain"
          />
        </Link>
        <i
          className="pi pi-times text-xl text-gray-700 cursor-pointer"
          onClick={closeSidebar}
        ></i>
      </div>
      <div className="h-[90%] flex  justify-between flex-col">
        <div className="py-5 px-6">
          <div className="flex gap-1 items-center flex-row">
            <Image
              src={servicesIcon}
              alt="services-icon"
              height={25}
              width={35}
            />
            <h2 className="text-xl text-[#1aac83] font-semibold saira-font">
              Services
            </h2>
          </div>
          <nav className="flex flex-col gap-1 py-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
            flex text-sm items-center gap-3 px-5 py-2 rounded-md transition-all duration-200
            ${
              isActive
                ? "bg-[#e6f7f3]  text-[#1aac83] font-semibold border-l-4 border-[#1aac83]"
                : "text-gray-600 hover:bg-gray-100 hover:text-[#1aac83]"
            }
          `}
                >
                  {/* možeš i drugu ikonu po potrebi */}
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="width-full flex flex-col items-center gap-2">
          <button className="w-[90%] py-2 px-4 border border-solid border-[#1aac83] bg-white text-[#1aac83] saira-font cursor-pointer transition-all duration-300 transform hover:scale-105">
            Log In{" "}
          </button>
          <button className="w-[90%] py-2 px-4 bg-[#1aac83] text-white saira-font border border-solid border-[#1aac83] cursor-pointer transition-all duration-300 transform hover:scale-105">
            Sign Up{" "}
          </button>
        </div>
      </div>

      {/* <div className="py-5 px-6">
        <div className="flex gap-2 items-center flex-row">
          <Image src={pricingIcon} alt="services-icon" height={25} width={35} />
          <h2 className="text-xl text-[#1aac83] font-semibold saira-font">
            Pricing
          </h2>
        </div>
      </div> */}
    </Sidebar>
  );
};

export default MenuSidebar;
