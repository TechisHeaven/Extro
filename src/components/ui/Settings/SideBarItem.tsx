"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SidebarNavItemProps } from "../SidebarComponents/SidebarNavItem";
import CustomToolTip from "../CustomToolTip/CustomToolTip";
import { useWindowSize } from "@/hooks/windowSize";

export default function SideBarItem({ title, url, icon }: SidebarNavItemProps) {
  const pathname = usePathname();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const size = useWindowSize();

  function handleSidebarCollapsed() {
    if (size.width <= 500) {
      setIsSidebarCollapsed(true);
    } else {
      setIsSidebarCollapsed(false);
    }
  }

  useEffect(() => {
    handleSidebarCollapsed();
  }, [size]);

  return url ? (
    <Link
      href={url}
      className={cn(
        "inline-flex items-start justify-center aspect-square sm:aspect-auto sm:justify-start md:justify-start gap-2 p-2 capitalize rounded-md ",
        pathname == url ? "bg-mainColor text-white" : "",
        isSidebarCollapsed && "w-fit"
      )}
    >
      {isSidebarCollapsed ? (
        <CustomToolTip content={title} position="right">
          {icon}
        </CustomToolTip>
      ) : (
        icon
      )}
      {!isSidebarCollapsed && title}
    </Link>
  ) : (
    <p
      className={cn(
        "inline-flex items-center gap-2 p-2 capitalize rounded-md",
        pathname == url && "bg-mainColor text-white"
      )}
    >
      {icon}
      {title}
    </p>
  );
}
