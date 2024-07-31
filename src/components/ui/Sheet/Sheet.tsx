import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
interface SheetProps {
  trigger: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
  className?: React.ComponentProps<"div">["className"];
}
export default function SheetComponent({
  trigger,
  title,
  description,
  children,
  className,
}: SheetProps) {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>{description}</SheetDescription>
          </SheetHeader>
          <div className={className}>{children}</div>
        </SheetContent>
      </Sheet>
    </>
  );
}
