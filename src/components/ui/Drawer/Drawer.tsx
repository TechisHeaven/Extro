"use client";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useEffect } from "react";

interface SheetProps {
  trigger: React.ReactNode;
  title: string;
  description: string;
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  className?: React.ComponentProps<"div">["className"];
}

export function DrawerComponent({
  trigger,
  title,
  description,
  children,
  className,
  isDrawerOpen,
  setIsDrawerOpen,
}: SheetProps) {
  function handleOpen() {
    if (!isDrawerOpen) {
      setIsDrawerOpen(true);
    }
  }

  function handleClose() {
    setIsDrawerOpen(false);
  }

  return (
    <Drawer open={isDrawerOpen} onClose={handleClose}>
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
