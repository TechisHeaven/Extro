import { cn } from "@/lib/utils";
import React from "react";

interface MainCardProps {
  title: string;
  className?: React.ComponentProps<"div">["className"];
  children: React.ReactNode;
}

export default async function MainCard({
  title,
  children,
  className,
}: MainCardProps) {
  return (
    <div className="p-4 border flex flex-col gap-2 justify-between shadow-md rounded-sm h-full max-h-56">
      <h1 className="text-xl font-semibold">{title}</h1>
      <div className={cn(className, "h-full")}>{children}</div>
    </div>
  );
}
