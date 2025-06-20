"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/compress-image", label: "COMPRESS IMAGE" },
  { href: "/convert-image", label: "CONVERT IMAGE" },
  { href: "/crop-image", label: "CROP IMAGE" },
  { href: "/resize-image", label: "RESIZE IMAGE" },
  { href: "/watermark-image", label: "WATERMARKING IMAGE" },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <div className="px-10 h-20 flex justify-between items-center bg-[#f4f4f4]">
      <div>
        <Link href="/">
          <h1 className="text-white text-3xl cursor-pointer">
            <span
              style={{
                textShadow:
                  "-1px -1px 0 #1aac83, 1px -1px 0 #1aac83, -1px 1px 0 #1aac83, 1px 1px 0 #1aac83",
                color: "white",
              }}
            >
              Imagi
            </span>
            <span
              style={{
                color: "#1aac83",
                textShadow:
                  "-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white",
              }}
            >
              Craft
            </span>
          </h1>
        </Link>
      </div>
      <div className="hidden lg:block">
        <ul className="flex items-center gap-7">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm"
              style={{
                color: pathname === item.href ? "#1aac83" : undefined,
              }}
            >
              {item.label}
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
