import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import React from "react";

interface MainCardProps {
  title: string;
  description?: string;
  className?: React.ComponentProps<"div">["className"];
  children: React.ReactNode;
  badge?: string;
}

export default async function MainCard({
  title,
  children,
  className,
  description,
  badge,
}: MainCardProps) {
  return (
    <div
      className={cn(
        "border flex items-start flex-col gap-2 justify-between shadow-sm rounded-md h-full p-6"
      )}
    >
      {badge && (
        <Badge className="bg-gray-200 text-secondaryColor">{badge}</Badge>
      )}

      <h1 className="text-xl font-semibold">{title}</h1>
      <h1 className="text-xs text-secondaryColor">{description}</h1>
      <div className={cn(className, "h-full")}>{children}</div>
    </div>
  );
}
