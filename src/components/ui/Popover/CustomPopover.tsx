import React, { HTMLProps } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
interface PopoverProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
  align?: "start" | "center" | "end";
  className?: HTMLProps<HTMLElement>["className"];
}
const CustomPopover = ({
  children,
  trigger,
  align = "end",
  className,
}: PopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent className={className} align={align}>
        {children}
      </PopoverContent>
    </Popover>
  );
};

export default CustomPopover;
