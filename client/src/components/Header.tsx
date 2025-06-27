"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import frostyImg from "../assets/frostyImg-transparent.png";

const navItems = [
  { href: "/compress-image", label: "compress Image" },
  { href: "/convert-image", label: "convert Image" },
  { href: "/crop-image", label: "crop Image" },
  { href: "/resize-image", label: "resize Image" },
  { href: "/watermark-image", label: "watermark Image" },
];

const Header = () => {
  const pathname = usePathname();
  const menuRef = useRef<Menu>(null);

  const menuItems = [
    ...navItems.map((item) => ({
      label: item.label,
      command: () => (window.location.href = item.href),
    })),
    { separator: true },
    {
      label: "Log In",
      command: () => alert("Redirect to login..."),
    },
    {
      label: "Sign Up",
      command: () => alert("Redirect to signup..."),
    },
  ];

  return (
    <div className="sticky top-0 z-50 px-6 sm:px-8 h-20 flex justify-between items-center bg-white border-b border-slate-200">
      <Link href="/">
        <Image src={frostyImg} alt="frosty-img-logo" height={70} width={160} />
      </Link>

      {/* Large screen navigation */}
      <nav className="hidden lg2:flex items-center gap-7">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-[15px] transition-colors ${
              pathname === item.href
                ? "text-[#22C7A8]"
                : "text-[#555] hover:text-[#22C7A8]"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Buttons for large screens */}
      <div className="hidden lg2:flex items-center gap-2">
        <button className="py-2 px-4 bg-[#1aac83] text-white saira-font border border-solid border-[#1aac83] cursor-pointer transition-all duration-300 transform hover:scale-105">
          Log In
        </button>
        <button className="py-2 px-4 border border-solid border-[#1aac83] bg-white text-[#1aac83] saira-font cursor-pointer transition-all duration-300 transform hover:scale-105">
          Sign Up
        </button>
      </div>

      {/* Mobile hamburger */}
      <div className="lg2:hidden flex items-center">
        <Button
          icon="pi pi-bars"
          className="p-button-text text-3xl"
          style={{ color: "#1aac83" }}
          onClick={(e) => menuRef.current?.toggle(e)}
          aria-label="Menu"
        />
        <Menu model={menuItems} popup ref={menuRef} />
      </div>
    </div>
  );
};

export default Header;
