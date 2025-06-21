"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
        <h1 className="text-3xl font-bold cursor-pointer">
          <span style={{ color: "#22C7A8" }}>Imagi</span>
          <span style={{ color: "#333" }}>Craft</span>
        </h1>
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
    </div>
  );
};

export default Header;
