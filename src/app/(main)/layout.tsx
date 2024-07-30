"use client";
import { usePathname } from "next/navigation";
import Header from "@/components/ui/Header/Header";
import React from "react";
import SidebarMain from "@/components/ui/Sidebar/SidebarMain";
interface LayoutProps {
  children: React.ReactNode;
  table: React.ReactNode;
}
export default function Layout({ children, table }: LayoutProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isSettingsRoute = pathname.startsWith("/settings");
  return (
    <div className="inline-flex w-full relative ">
      <SidebarMain />
      <div className="w-full">
        <Header />
        {children}
        {isHomePage && table}
      </div>
    </div>
  );
}
