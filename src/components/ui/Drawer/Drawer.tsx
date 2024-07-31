import * as React from "react";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface SheetProps {
  trigger: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
  className?: React.ComponentProps<"div">["className"];
}
export function DrawerComponent({
  trigger,
  title,
  description,
  children,
  className,
}: SheetProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <div className={className}>{children}</div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
