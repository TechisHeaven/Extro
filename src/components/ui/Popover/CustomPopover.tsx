import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
interface PopoverProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
  align?: "start" | "center" | "end";
}
const CustomPopover = ({ children, trigger, align = "end" }: PopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent align={align}>{children}</PopoverContent>
    </Popover>
  );
};

export default CustomPopover;
