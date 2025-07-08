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
  <div>
    <div className="p-inputgroup ">
      <span className="p-inputgroup-addon">
        <i className={icon}></i>
      </span>{" "}
      <InputText
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        name={name}
        type="password"
        placeholder={placeholder}
        className="placeholder:text-sm"
      />
    </div>
    {typeof error === "string" && (
      <p className="text-red-500 text-xs mt-1">{error}</p>
    )}
  </div>
);

export default PasswordInput;
