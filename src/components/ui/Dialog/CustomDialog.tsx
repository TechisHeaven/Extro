"use client";

import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "../dialog";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface DialogProps {
  children: React.ReactNode;
  trigger?: React.ReactElement;
  open?: boolean;
  setIsDialogOpen?: any;
  title?: string;
  description?: string;
  className?: React.ComponentProps<"div">["className"];
  redirect?: string;
  goBack?: boolean;
}
export function CustomDialog({
  open = true,
  setIsDialogOpen,
  children,
  trigger,
  title,
  description,
  className,
  redirect,
  goBack,
}: DialogProps) {
  const router = useRouter();

  function handleClose() {
    if (redirect) {
      router.push(redirect);
      return;
    }
    if (goBack) {
      router.back();
      return;
    }
    setIsDialogOpen(!open);
  }
  return (
    <Dialog open={open} defaultOpen={open} onOpenChange={handleClose}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={cn(" p-0", className)}>
        {children}
      </DialogContent>
    </Dialog>
  );
}
