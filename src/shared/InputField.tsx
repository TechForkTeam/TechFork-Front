import { cn } from "../utils/cn";
import clsx from "clsx";

interface InputFieldProps {
  label: string;
  placeholder: string;
  className?: string;
  isDot?: boolean;
  area?: boolean;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  value?: string;
  disabled?: boolean;
}

export const InputField = ({
  label,
  placeholder,
  className,
  isDot,
  area,
  value,
  onChange,
  disabled,
}: InputFieldProps) => {
  return (
    <div className="w-full">
      <div className="flex">
        <p className={cn("mb-3 body-sb-16", className)}>{label}</p>
        {isDot && <p className="text-alert">*</p>}
      </div>
      <div className="w-full  rounded-xl mb-5">
        {!area ? (
          <input
            type="text"
            className={clsx(
              "w-full p-3 body-r-14  rounded-xl border  border-[#E5E8EB] bg-[#F7F8F9] focus:outline-none focus:border-blue-300 ",
              disabled && "text-gray-400",
            )}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
          />
        ) : (
          <textarea
            className="w-full    p-3 body-r-14  rounded-xl border  border-[#E5E8EB] bg-[#F7F8F9] focus:outline-none focus:border-blue-300
        h-30 resize-none
        "
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  );
};
