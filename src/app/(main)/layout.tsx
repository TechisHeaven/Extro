"use client";
import { usePathname } from "next/navigation";
import Header from "@/components/ui/Header/Header";
import Sidebar from "@/components/ui/sidebar/sidebar";

import React from "react";
interface LayoutProps {
  children: React.ReactNode;
  table: React.ReactNode;
}
export default function Layout({ children, table }: LayoutProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  return (
    <div className="inline-flex w-full relative ">
      <Sidebar />
      <div className="w-full">
        <Header />
        {children}
        {isHomePage && table}
        {/* {table} */}
      </div>
    </div>
  );
}
