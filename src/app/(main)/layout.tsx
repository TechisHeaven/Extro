"use client";
import { usePathname } from "next/navigation";
import Header from "@/components/ui/Header/Header";
import Sidebar from "@/components/ui/Sidebar/sidebar";

import React from "react";
import Settings from "@/components/ui/Settings/Settings";
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
      <Sidebar />
      <div className="w-full">
        <Header />
        {children}
        {isHomePage && table}
      </div>
    </div>
  );
}
