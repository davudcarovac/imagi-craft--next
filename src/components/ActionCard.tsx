import { StaticImageData } from "next/image";
import Link from "next/link";

type ActionCardProps = {
  actionName: string;
  description: string;
  icon: string | StaticImageData;
  to: string;
};

const ActionCard = ({ actionName, description, icon, to }: ActionCardProps) => {
  return (
    <Link href={to} className="p-6 bg-[#f4f4f4]">
      <div>
        <img src={icon as string} alt={actionName} className="h-12 w-12" />
        <h2 className="text-lg font-semibold  py-2 ">{actionName}</h2>
        <p className="text-sm text-[#707078]">{description}</p>
      </div>
    </Link>
  );
};

export default ActionCard;
