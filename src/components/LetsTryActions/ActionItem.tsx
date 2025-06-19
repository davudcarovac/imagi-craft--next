import { Link } from "react-router-dom";

type ActionItemType = {
  actionName: string;
  icon: string;
  to: string;
};

const ActionItem = ({ actionName, icon, to }: ActionItemType) => {
  return (
    <Link to={`/${to}`}>
      <div className="py-2 px-3 bg flex items-center flex-row gap-4 cursor-pointer rounded-md shadow-sm transition duration-200 hover:opacity-35">
        <div className="p-2 bg-[#f4f4f4] rounded-md">
          <img src={icon} alt={`icon-${actionName}`} height={25} width={25} />
        </div>
        <p className="text-sm">{actionName}</p>
      </div>
    </Link>
  );
};

export default ActionItem;
