import Link from "next/link";
import { usePathname } from "next/navigation";
import ToolsDropdown from "./ToolsDropdown";

const Navbar = () => {
  const pathname = usePathname();

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
