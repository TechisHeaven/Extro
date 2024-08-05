import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return <div className="bg-[#f2f2f2]">{children}</div>;
}
