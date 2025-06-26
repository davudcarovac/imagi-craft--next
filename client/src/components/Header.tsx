"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import frostyImg from "../assets/frostyImg-transparent.png";
import "primeicons/primeicons.css";
import { useState } from "react";
import useUserId from "@/hooks/useUserID";
import { addUserLike } from "@/lib/getUserIP";

const navItems = [
  { href: "/compress-image", label: "compress image" },
  { href: "/convert-image", label: "convert image" },
  { href: "/crop-image", label: "crop image" },
  { href: "/resize-image", label: "resize image" },
  { href: "/watermark-image", label: "watermark image" },
];

const Header = () => {
  const pathname = usePathname();
  // const userId = useUserId();

  // const handleLike = async () => {
  //   if (!userId) {
  //     setMessage("Loading user info...");
  //     return;
  //   }
  //   const res = await addUserLike(userId);
  //   setMessage(res.success ? "Thanks for liking!" : res.message);
  // };

  return (
    <div className="sticky top-0 z-50 px-8 h-20 flex justify-between items-center bg-white border-b border-slate-200">
      <Link href="/">
        <Image src={frostyImg} alt="frosty-img-logo" height={70} width={160} />
      </Link>

      <nav className="hidden lg:block">
        <ul className="flex items-center gap-7">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-md transition-colors ${
                pathname === item.href
                  ? "text-[#22C7A8]"
                  : "text-[#555] hover:text-[#22C7A8]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </ul>
      </nav>

      {/* <div className="flex items-center gap-2">
        {message}
        <i className="pi pi-thumbs-up cursor-pointer" onClick={handleLike}></i>
        <i className="pi pi-thumbs-down"></i>
      </div> */}

      <div className="flex items-center gap-2 flex-row">
        <button className="py-2 px-4 bg-[#1aac83] text-white saira-font border border-solid border-[#1aac83] cursor-pointer  transition-all duration-300 transform hover:scale-105 ">
          Log In
        </button>
        <button className="py-2 px-4  border border-solid border-[#1aac83] bg-white text-[#1aac83] saira-font cursor-pointer  transition-all duration-300 transform hover:scale-105 ">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Header;
