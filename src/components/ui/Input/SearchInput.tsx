import { cn } from "@/lib/utils";
import React from "react";
interface SearchInputProps {
  isDisabled?: boolean;
  placeholder?: string;
  value?: string;
  icon?: React.ReactNode;
  onChange?: (value: any) => void;
  className?: React.ComponentProps<"div">["className"];
}
const SearchInput = ({
  isDisabled = false,
  placeholder,
  value,
  onChange,
  className,
  icon,
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
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={isDisabled}
        className={"outline-none w-full"}
      />
    </div>
  );
};

export default SearchInput;
