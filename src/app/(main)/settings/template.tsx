import { CustomDialog } from "@/components/ui/Dialog/CustomDialog";
import { SidebarNavProps } from "@/components/ui/Settings/Settings";
import React from "react";
import { Laptop, Search, SettingsIcon, User } from "lucide-react";
import { cn } from "@/lib/utils";
import SearchInput from "@/components/ui/Input/SearchInput";
import SideBarItem from "@/components/ui/Settings/SideBarItem";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <CustomDialog className="md:max-w-screen-sm">
      <div className="inline-flex gap-4">
        <div className="Sidebar w-full max-w-48">
          <h1 className="font-semibold text-2xl p-4">Settings</h1>
          <div className="sidebar-items py-4 flex flex-col gap-2">
            {sidebarIconsData.map((item: SidebarNavProps, index: number) => {
              return (
                <SideBarItem
                  key={index}
                  title={item.title}
                  url={item.url}
                  icon={item.icon}
                />
              );
            })}
          </div>
        </div>
        <div>
          <div className="Header p-4 inline-flex justify-between w-full">
            <div className="search w-full">
              <SearchInput
                icon={
                  <Search className="w-4 text-secondaryColor placeholder:text-sm" />
                }
                placeholder="Search..."
              />
            </div>
          </div>
          <div className="components-childrens">{children}</div>
        </div>
      </div>
    </CustomDialog>
  );
}

const sidebarIconsData: SidebarNavProps[] = [
  {
    title: "profile",
    url: "/settings/me",
    icon: <User className="w-4" />,
  },
  {
    title: "account",
    url: "/settings/account",
    icon: <SettingsIcon className="w-4" />,
  },
  {
    title: "Appearance",
    url: "/settings/appearance",
    icon: <Laptop className="w-4" />,
  },
];
