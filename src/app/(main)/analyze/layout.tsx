import React from "react";
interface LayoutProps {
  children: React.ReactNode;
  table: React.ReactNode;
}
export default function Layout({ children, table }: LayoutProps) {
  return (
    <div className="flex flex-col items-start max-w-[1400px] m-auto w-full relative">
      {children}
      {table}
    </div>
  );
}
