import Link from "next/link";
import { usePathname } from "next/navigation";
import ToolsDropdown from "./ToolsDropdown";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex items-center justify-center bg-[#dce9e3] backdrop-blur-md rounded-full shadow-md px-8 py-1 border border-[#c9dbd4]/60 transition-all duration-300 hover:shadow-lg">
      <nav className="flex items-center gap-8">
        <Link
          href="/"
          className={`text-[15px] py-2 font-medium transition-colors saira-font ${
            pathname === "/"
              ? "text-[#1aac83]"
              : "text-[#333] hover:text-[#1aac83]"
          }`}
        >
          Home
        </Link>

        <ToolsDropdown />

        <Link
          href="/pricing"
          className={`text-[15px] py-2 font-medium transition-colors saira-font ${
            pathname === "/pricing"
              ? "text-[#1aac83]"
              : "text-[#333] hover:text-[#1aac83]"
          }`}
        >
          Pricing
        </Link>
        <Link
          href="/image-metadata"
          className={`text-[15px] py-2 font-medium transition-colors saira-font ${
            pathname === "/image-metadata"
              ? "text-[#1aac83]"
              : "text-[#333] hover:text-[#1aac83]"
          }`}
        >
          Metadata
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
