import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";

interface ToolTipProps {
  children: React.ReactNode;
  position?: positionProps;
  content: string;
}
type positionProps = "right" | "left" | "top" | "bottom";

const CustomToolTip = ({
  children,
  position = "right",
  content,
}: ToolTipProps) => {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent side={position} align="start">
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CustomToolTip;
