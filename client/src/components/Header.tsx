"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import frostyImg from "../assets/frostyImg-transparent.png";
import MenuSidebar from "./MenuSidebar";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Toast } from "primereact/toast";
import UserMenu from "./UserMenu";

const navItems = [
  { href: "/compress-image", label: "compress Image" },
  { href: "/convert-image", label: "convert Image" },
  { href: "/crop-image", label: "crop Image" },
  { href: "/resize-image", label: "resize Image" },
  { href: "/watermark-image", label: "watermark Image" },
];

const profileMenuItems = [
  {
    label: "Account",
    href: "/user/account",
  },
  {
    label: "Security",
    href: "/user/security",
  },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const toast = useRef<Toast>(null);
  const menuRef = useRef<Menu>(null);
  const router = useRouter();
  const { user, isLoading } = useAuthContext();
  const { width } = useWindowSize();

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const closeSidebar = () => setIsOpen(false);

  useEffect(() => {
    if (width > 1170 || pathname) {
      setIsOpen(false);
    }
  }, [width, pathname]);

  // Menu items za korisnički meni
  const menuItems = [
    {
      label: "Profile",
      icon: "pi pi-user",
      command: () => router.push("/profile"),
    },
    {
      label: "Premium",
      icon: "pi pi-crown",
      command: () => router.push("/pricing"),
    },
    {
      label: "Logout",
      icon: "pi pi-sign-out",
      command: () => {
        // TODO: implementiraj logout logiku, npr:
        // dispatch({ type: "LOGOUT" });
        // localStorage.removeItem("user");
        // router.push("/login");
      },
    },
  ];

  // Render korisničkog dela zaglavlja
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

    // Kada je user logovan
    return (
      <div className="relative hidden lg2:block">
        <UserMenu />
        {/* <button
          aria-controls="popup_menu"
          aria-haspopup="true"
          onClick={(e) => menuRef.current?.toggle(e)}
          className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full bg-[#1aac83]/10 text-[#1aac83] hover:bg-[#1aac83]/20 transition"
          type="button"
        >
          <Image src={userImg} height={45} width={45} alt="user-img" />
        </button> */}
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 px-6 sm:px-8 h-20 flex justify-between items-center bg-white border-b border-slate-200">
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

      {/* Navigacija za veće ekrane */}
      <nav className="hidden lg2:flex items-center gap-7">
        {navItems.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`text-[15px] transition-colors ${
              pathname === href
                ? "text-[#22C7A8]"
                : "text-[#555] hover:text-[#22C7A8]"
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>

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
