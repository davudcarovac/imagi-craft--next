"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import frostyImg from "../assets/frostyImg-transparent.png";

const navItems = [
  { href: "/compress-image", label: "compress image" },
  { href: "/convert-image", label: "convert image" },
  { href: "/crop-image", label: "crop image" },
  { href: "/resize-image", label: "resize image" },
  { href: "/watermark-image", label: "watermark image" },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <div className="px-8 h-20 flex justify-between items-center bg-white border-b border-slate-200">
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

      <div></div>
    </div>
  );
};

export default Header;
