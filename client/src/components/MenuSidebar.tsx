import React, { ReactNode } from "react";
import { Sidebar } from "primereact/sidebar";
import Image from "next/image";
import Link from "next/link";
import frostyImg from "../assets/frostyImg-transparent.png";
import { usePathname, useRouter } from "next/navigation";

import servicesIcon from "../assets/action icons/nav/services.png";
import { useAuthContext } from "@/hooks/useAuthContext";
import pricingIcon from "../assets/action icons/nav/credit-card.png";
import profileImg from "@/assets/button images/user1.png";
import { useLogout } from "@/hooks/useLogout";
import { useQueryClient } from "@tanstack/react-query";

type MenuSidebarType = {
  isOpen: boolean;
  closeSidebar: () => void;
  navItems: { href: string; label: string }[];
  profileMenuItems: { href: string; label: string }[];
};

const MenuSidebar = ({
  navItems,
  profileMenuItems,
  isOpen,
  closeSidebar,
}: MenuSidebarType) => {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isLoading, dispatch } = useAuthContext();
  const { mutate: logoutMutate } = useLogout();

  const renderUserOptions = (component: ReactNode) => {
    if (isLoading) return <div></div>;

    if (user) {
      return component;
    }
  };

  const logout = () => {
    logoutMutate(undefined, {
      onSuccess: (response) => {
        dispatch({ type: "LOGOUT" });
        if (typeof window !== "undefined") {
          localStorage.removeItem("user");
        }
        queryClient.cancelQueries({ queryKey: ["user"] });
        queryClient.removeQueries({ queryKey: ["user"] });
        queryClient.invalidateQueries({ queryKey: ["user"] });

        router.push("/login");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

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
      <div className="h-[90%] flex  justify-between flex-col py-5">
        <div className="flex flex-col gap-5">
          {renderUserOptions(
            <div className=" px-6">
              <div className="flex gap-1 items-center flex-row">
                <Image
                  src={profileImg}
                  alt="services-icon"
                  height={25}
                  width={35}
                />
                <h2 className="text-xl text-[#1aac83] font-semibold saira-font">
                  Profile
                </h2>
              </div>
              <nav className="flex flex-col gap-1 py-3">
                {profileMenuItems.map((item) => {
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
          )}

          <div className=" px-6">
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

          {renderUserOptions(
            <div className=" px-6">
              <div className="flex gap-2 items-center flex-row">
                <Image
                  src={pricingIcon}
                  alt="services-icon"
                  height={25}
                  width={35}
                />
                <h2 className="text-xl text-[#1aac83] font-semibold saira-font">
                  Pricing
                </h2>
              </div>
            </div>
          )}
        </div>
        {!user ? (
          <div className="width-full flex flex-col items-center gap-2">
            <Link
              href="/login"
              className="text-center w-[90%] py-2 px-4 border border-solid border-[#1aac83] bg-white text-[#1aac83] saira-font cursor-pointer transition-all duration-300 transform hover:scale-105"
            >
              Log In{" "}
            </Link>
            <Link
              href="/signup"
              className="text-center w-[90%] py-2 px-4 bg-[#1aac83] text-white saira-font border border-solid border-[#1aac83] cursor-pointer transition-all duration-300 transform hover:scale-105"
            >
              Sign Up{" "}
            </Link>
          </div>
        ) : (
          <div className="width-full flex flex-col items-center gap-2">
            <button
              onClick={logout}
              className="w-[90%] text-center px-4 py-2 bg-red-100 text-red-500 cursor-pointer rounded-md font-semibold saira-font"
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </Sidebar>
  );
};

export default MenuSidebar;
