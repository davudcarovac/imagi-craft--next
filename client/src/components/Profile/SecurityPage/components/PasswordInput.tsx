import { InputText } from "primereact/inputtext";

interface PasswordInputProps {
  icon: string;
  name: string;
  placeholder: string;
  value: string;
  error?: string | boolean | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const PasswordInput = ({
  icon,
  name,
  placeholder,
  value,
  error,
  onChange,
  onBlur,
}: PasswordInputProps) => (
  <div className="space-y-1">
    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500">
      <span className="px-3 py-2 bg-gray-100 text-gray-500">
        <i className={icon}></i>
      </span>
      <InputText
        name={name}
        type="password"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="w-full px-3 py-2 text-sm border-0 focus:ring-0"
      />
    </div>
    {typeof error === "string" && (
      <p className="text-red-500 text-xs mt-1">{error}</p>
    )}
  </div>
);

export default PasswordInput;
