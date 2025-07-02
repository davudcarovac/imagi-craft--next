import React, { ReactNode } from "react";

type InputComponentProps = {
  labelName?: string;
  name: string;
  value: string;
  icon: ReactNode;
  placeholder: string;
  type: string;
  isPending: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const InputComponent = ({
  labelName,
  name,
  icon,
  value,
  placeholder,
  type,
  isPending,
  onChange,
  onBlur,
}: InputComponentProps) => {
  return (
    <div className="mb-2">
      <label className="block text-gray-700 font-semibold mb-2">
        {labelName}
      </label>
      <div className="flex items-center overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-[#1aac83]  shadow-sm transition">
        <div className="flex items-center justify-center p-3 border border-r-gray-300 border-r-solid h-full bg-white text-white">
          {icon}
        </div>
        <input
          disabled={isPending}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className="flex-1  py-2 px-4 text-gray-900 placeholder-gray-400 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default InputComponent;
