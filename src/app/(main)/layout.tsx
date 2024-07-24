import Header from "@/components/ui/Header/Header";
import Sidebar from "@/components/ui/sidebar/sidebar";
import React from "react";
interface LayoutProps {
  children: React.ReactNode;
}
export default function layout({ children }: LayoutProps) {
  return (
    <div className="inline-flex w-full relative">
      <Sidebar />
      <div className="w-full">
        <Header />
        {children}
      </div>
    </div>
  );
}
