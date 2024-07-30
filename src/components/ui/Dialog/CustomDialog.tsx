"use client";

import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "../dialog";
import { useRouter } from "next/navigation";

interface DialogProps {
  children: React.ReactNode;
  trigger?: React.ReactElement;
  title?: string;
  description?: string;
  className?: React.ComponentProps<"div">["className"];
}
export function CustomDialog({
  children,
  trigger,
  title,
  description,
  className,
}: DialogProps) {
  const router = useRouter();
  function handleClose() {
    router.back();
  }
  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={cn(" p-0", className)}>
        {children}
      </DialogContent>
    </Dialog>
  );
}
