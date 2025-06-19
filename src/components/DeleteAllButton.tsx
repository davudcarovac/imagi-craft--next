import { ReactNode } from "react";

type DeleteAllButtonProps = {
  children: ReactNode;
  className: string;
  deleteAll: () => void;
};

const DeleteAllButton = ({
  children,
  className,
  deleteAll,
}: DeleteAllButtonProps) => {
  return (
    <button
      onClick={deleteAll}
      className={`bg-[#e7195a] flex items-center flex-row gap-2 ${className} cursor-pointer text-white  text-lg rounded-md`}
    >
      {children}
    </button>
  );
};

export default DeleteAllButton;
