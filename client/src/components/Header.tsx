"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import frostyImg from "../assets/frostyImg-transparent.png";
import MenuSidebar from "./MenuSidebar";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Toast } from "primereact/toast";
import UserMenu from "./UserMenu";
import Navbar from "./Navbar";

const navItems = [
  { href: "/compress-image", label: "compress Image" },
  { href: "/convert-image", label: "convert Image" },
  { href: "/crop-image", label: "crop Image" },
  { href: "/resize-image", label: "resize Image" },
  { href: "/watermark-image", label: "watermark Image" },
];

const profileMenuItems = [
  {
    label: "Profile",
    href: "/profile",
  },
  {
    label: "Security",
    href: "/profile/security",
  },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const toast = useRef<Toast>(null);
  const { user, isLoading } = useAuthContext();
  const { width } = useWindowSize();

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const closeSidebar = () => setIsOpen(false);

  useEffect(() => {
    if (width > 1170 || pathname) {
      setIsOpen(false);
    }
  }, [width, pathname]);

  // useEffect(() => {
  //   console.log("User ==> ", user);
  // }, [user]);

  const renderUser = () => {
    if (isLoading) return <div className="w-10 h-10" />; // može i loader ako hoćeš

    if (!user)
      return (
        <div className="hidden lg2:flex items-center gap-2">
          <Link
            href="/login"
            className="py-2 px-4 bg-[#1aac83] text-white saira-font border border-solid border-[#1aac83] cursor-pointer transition-all duration-300 transform hover:scale-105"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="py-2 px-4 border border-solid border-[#1aac83] bg-white text-[#1aac83] saira-font cursor-pointer transition-all duration-300 transform hover:scale-105"
          >
            Sign Up
          </Link>
        </div>
      );

    return (
      <div className="relative hidden lg2:block">
        <UserMenu />
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 px-6 sm:px-8 h-20 flex justify-between items-center bg-[#ffffff] ">
      <Toast ref={toast} />

      <Link href="/">
        <Image
          src={frostyImg}
          alt="frosty-img-logo"
          height={70}
          width={160}
          priority
        />
      </Link>

      <div>
        <Navbar />
      </div>

      {/* Korisnički deo */}
      {renderUser()}

      {/* Hamburger meni za mobilne */}
      <div className="lg2:hidden flex items-center">
        <Button
          icon="pi pi-bars"
          className="p-button-text text-3xl"
          style={{ color: "#1aac83" }}
          onClick={toggleSidebar}
          aria-label="Menu"
        />
      </div>

      {/* Sidebar meni */}
      <MenuSidebar
        navItems={navItems}
        profileMenuItems={profileMenuItems}
        isOpen={isOpen}
        closeSidebar={closeSidebar}
      />
    </header>
  );
};

export default Header;
