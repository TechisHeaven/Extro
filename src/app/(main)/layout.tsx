"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/ui/Header/Header";
import SidebarMain from "@/components/ui/SidebarComponents/SidebarMain";
import { useWindowSize } from "@/hooks/windowSize";
import BottomSideBar from "@/components/ui/SidebarComponents/BottomSideBar";
import { ExpenseStoreProvider } from "@/providers/expense.provider";
interface LayoutProps {
  children: React.ReactNode;
  table: React.ReactNode;
  settingDialog: React.ReactNode;
}
export default function Layout({
  children,
  table,
  settingDialog,
}: LayoutProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const size = useWindowSize();
  const isMobileView = size.width <= 600 ? true : false;
  //change
  return (
    <div className="inline-flex w-full relative">
      {isMobileView ? <BottomSideBar /> : <SidebarMain />}

      <div className="w-full">
        <Header />
        <ExpenseStoreProvider>{children}</ExpenseStoreProvider>
        {isHomePage && table}
        {settingDialog}
      </div>
    </div>
  );
}
