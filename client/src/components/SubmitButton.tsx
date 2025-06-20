import { ReactNode } from "react";

type SubmitButtonProps = {
  children: ReactNode;
  alt: string;
  imageSrc: string;
  isButtonDisabled?: boolean;
};

const SubmitButton = ({
  children,
  alt,
  imageSrc,
  isButtonDisabled,
}: SubmitButtonProps) => {
  return (
    <button
      disabled={isButtonDisabled}
      type="submit"
      className={`${isButtonDisabled ? "opacity-50" : "opacity-100"}
   cursor-pointer my-10 bg-[#1aac83] flex items-center flex-row gap-2 px-3 py-2 text-white  text-lg rounded-md`}
    >
      {children}
      <img src={imageSrc} alt={alt} height={16} width={16} />
    </button>
  );
};

export default SubmitButton;
