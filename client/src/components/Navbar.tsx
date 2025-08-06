import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import ToolsDropdown from "./ToolsDropdown";

const Navbar = () => {
  const pathname = usePathname();
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  const toolsItems = [
    { href: "/compress-image", label: "compress" },
    { href: "/convert-image", label: "convert" },
    { href: "/crop-image", label: "crop" },
    { href: "/resize-image", label: "resize" },
    { href: "/watermark-image", label: "watermark" },
    { href: "/crop-face", label: "crop face" },
    { href: "/collage-image", label: "collage maker" },
  ];

  return (
    <nav className="hidden lg:flex items-center gap-6">
      {/* Home Link */}
      <Link
        href="/"
        className={`text-[15px] py-3 font-medium transition-colors ${
          pathname === "/"
            ? "text-[#1aac83]"
            : "text-[#555] hover:text-[#1aac83]"
        }`}
      >
        Home
      </Link>

      {/* Tools Dropdown */}
      {/* <div className="relative">
        <div
          onMouseEnter={() => setIsToolsOpen(true)}
          onMouseLeave={() => setIsToolsOpen(false)}
          className="flex items-center gap-1 cursor-pointer"
        >
          <span
            className={`text-[15px] font-medium transition-colors ${
              pathname.startsWith("/tools") || isToolsOpen
                ? "text-[#1aac83]"
                : "text-[#555] hover:text-[#1aac83]"
            }`}
          >
            Tools
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              isToolsOpen ? "rotate-180" : ""
            }`}
          />

          {isToolsOpen && (
            <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
              <div className="py-1">
                {toolsItems.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#1aac83]"
                    onClick={() => setIsToolsOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div> */}
      <ToolsDropdown />

      {/* Pricing Link */}
      <Link
        href="/pricing"
        className={`text-[15px] font-medium transition-colors ${
          pathname === "/pricing"
            ? "text-[#1aac83]"
            : "text-[#555] hover:text-[#1aac83]"
        }`}
      >
        Pricing
      </Link>
    </nav>
  );
};

export default Navbar;
