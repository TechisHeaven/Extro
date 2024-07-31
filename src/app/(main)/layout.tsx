"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/ui/Header/Header";
import SidebarMain from "@/components/ui/Sidebar/SidebarMain";
interface LayoutProps {
  children: React.ReactNode;
  table: React.ReactNode;
}
export default function Layout({ children, table }: LayoutProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  //change
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
