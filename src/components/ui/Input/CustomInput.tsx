import { cn } from "@/lib/utils";
import React, { HTMLInputTypeAttribute } from "react";
interface SearchInputProps {
  isDisabled?: boolean;
  placeholder?: string;
  value?: string;
  type?: HTMLInputTypeAttribute;
  icon?: React.ReactNode;
  onChange?: (value: any) => void;
  className?: React.ComponentProps<"div">["className"];
}
const CustomInput = ({
  isDisabled = false,
  placeholder,
  value,
  onChange,
  className,
  icon,
  type,
}: SearchInputProps) => {
  return (
    <div
      className={cn(
        "input inline-flex gap-2 items-center border rounded-md p-2 w-full",
        className
      )}
    >
      {icon}
      <input
        type={type || "text"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={isDisabled}
        className={"outline-none w-full"}
      />
    </div>
  );
};

export default CustomInput;
