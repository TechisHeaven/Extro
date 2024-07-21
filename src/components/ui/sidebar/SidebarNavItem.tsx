"use client";
import React from "react";
import CustomToolTip from "../CustomToolTip/CustomToolTip";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export interface SidebarNavItemProps {
  title: string;
  icon: React.ReactNode;
  url: string;
}
const SidebarNavItem = ({ title, icon, url }: SidebarNavItemProps) => {
  const pathname = usePathname();
  return (
    <Link
      href={url}
      className={cn(
        "p-1 text-secondaryColor overflow-hidden bg-white rounded-md inline-flex gap-4 hover:text-mainColor transition-colors",
        pathname === url && "bg-mainColor hover:text-white"
      )}
    >
      <CustomToolTip content={title} position="right">
        {icon}
      </CustomToolTip>
    </Link>
  );
};

export default SidebarNavItem;
