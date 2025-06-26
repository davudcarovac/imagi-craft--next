import { ReactNode } from "react";

type SubmitButtonProps = {
  children: ReactNode;
  alt?: string;
  imageSrc?: string;
  isButtonDisabled?: boolean;
  className?: string;
};

const SubmitButton = ({
  children,
  alt,
  imageSrc,
  isButtonDisabled,
  className = "my-10",
}: SubmitButtonProps) => {
  return (
    <button
      disabled={isButtonDisabled}
      type="submit"
      className={`${isButtonDisabled ? "opacity-50" : "opacity-100"}
   cursor-pointer ${className} bg-[#1aac83] flex items-center flex-row gap-2 px-3 py-2 text-white  text-lg rounded-md saira-font`}
    >
      {children}
      {imageSrc && alt && (
        <img src={imageSrc} alt={alt} height={16} width={16} />
      )}
    </button>
  );
};

export default SubmitButton;
