import { cn } from "@/lib/utils";
import React from "react";
interface SearchInputProps {
  placeholder: string;
  value: string;
  onChange: (value: any) => void;
  className?: React.ComponentProps<"div">["className"];
}
const SearchInput = ({
  placeholder,
  value,
  onChange,
  className,
}: SearchInputProps) => {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={cn("border rounded-md p-2 px-4", className)}
    />
  );
};

export default SearchInput;
