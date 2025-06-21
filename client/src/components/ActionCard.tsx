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
      className="p-6 bg-white border border-[#E0E7EE] rounded-xl shadow-sm hover:shadow-md hover:border-[#22C7A8] hover:scale-[1.02] transition-all"
    >
      <div>
        <Image src={icon} alt={actionName} className="h-12 w-12 mb-3" />
        <h2 className="text-lg font-semibold text-[#333]">{actionName}</h2>
        <p className="text-sm text-[#555] mt-1">{description}</p>
      </div>
    </Link>
  );
};

export default ActionCard;
