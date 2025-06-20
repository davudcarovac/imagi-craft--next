import Image, { StaticImageData } from "next/image";
import Link from "next/link"; // ← koristi Next.js Link

type ActionItemType = {
  actionName: string;
  icon: string | StaticImageData;
  to: string;
};

const ActionItem = ({ actionName, icon, to }: ActionItemType) => {
  return (
    <Link href={`/${to}`}>
      <div className="py-2 px-3 bg flex items-center flex-row gap-4 cursor-pointer rounded-md shadow-sm transition duration-200 hover:opacity-35">
        <div className="p-2 bg-[#f4f4f4] rounded-md">
          <Image src={icon} alt={`icon-${actionName}`} height={25} width={25} />
        </div>
        <p className="text-sm">{actionName}</p>
      </div>
    </Link>
  );
};

export default ActionItem;
