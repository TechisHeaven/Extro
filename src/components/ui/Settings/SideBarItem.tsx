"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { SidebarNavProps } from "./Settings";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function SideBarItem({ title, url, icon }: SidebarNavProps) {
  const pathname = usePathname();
  return (
    <Link
      href={url}
      className={cn(
        "inline-flex items-center gap-2 p-2 capitalize rounded-md",
        pathname == url && "bg-mainColor text-white"
      )}
    >
      {icon}
      {title}
    </Link>
  );
}
