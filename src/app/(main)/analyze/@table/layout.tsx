import Header from "@/components/ui/Header/Header";
import Sidebar from "@/components/ui/Sidebar/SidebarMain";
import React from "react";
interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return <div className="inline-flex w-full relative">{children}</div>;
}
