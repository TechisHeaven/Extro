import React from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../hover-card";

interface HoverCardComponentProps {
  trigger: React.ReactElement;
  children: React.ReactNode;
}
const HoverCardComponent = ({ trigger, children }: HoverCardComponentProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>{trigger}</HoverCardTrigger>
      <HoverCardContent className="w-80">{children}</HoverCardContent>
    </HoverCard>
  );
};

export default HoverCardComponent;
