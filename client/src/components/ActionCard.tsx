import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type ActionCardProps = {
  actionName: string;
  description: string;
  icon: string | StaticImageData;
  to: string;
};

const ActionCard = ({ actionName, description, icon, to }: ActionCardProps) => {
  return (
    <Link
      href={to}
      className="relative p-6 bg-white/80 backdrop-blur border border-white/20 rounded-xl shadow-md hover:shadow-xl  hover:scale-[1.03] transition-transform duration-200"
    >
      <div className="flex flex-col items-center text-center">
        {/* Icon with background */}
        <div className="h-14 w-14 flex items-center justify-center rounded-full bg-[#22C7A8]/10 mb-4">
          <Image src={icon} alt={actionName} className="h-7 w-7" />
        </div>

        <h2 className="text-xl font-semibold text-[#222] tracking-tight saira-font">
          {actionName}
        </h2>
        <p className="text-sm text-[#555]/90 mt-1 leading-snug">
          {description}
        </p>
      </div>
    </Link>
  );
};

export default ActionCard;
