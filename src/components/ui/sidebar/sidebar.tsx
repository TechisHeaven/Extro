import {
  HelpCircle,
  Inbox,
  LogOut,
  PieChart,
  Settings as SettingsIcon,
} from "lucide-react";
import React from "react";
import SidebarNavItem, { SidebarNavItemProps } from "./SidebarNavItem";
import CustomToolTip from "@/components/ui//CustomToolTip/CustomToolTip";
import { CustomDialog } from "@/components/ui//Dialog/CustomDialog";
import Settings from "@/components/ui/Settings/Settings";

export default function Sidebar() {
  return (
    <div className="min-w-16 h-dvh p-4 flex flex-col border-r-2 font-semibold sticky top-0">
      <h1 className="Logo text-2xl font-semibold">ET</h1>
      <div className="nav-items flex flex-col gap-2 my-16">
        {sidebarIconsData.map((item: SidebarNavItemProps, index) => {
          return (
            <SidebarNavItem
              key={index}
              title={item.title}
              icon={item.icon}
              url={item.url}
            />
          );
        })}
      </div>
      <div className="bottom-items flex flex-col gap-8 absolute bottom-10">
        <CustomToolTip content="Help">
          <HelpCircle />
        </CustomToolTip>
        <CustomToolTip content="Logout">
          <LogOut />
        </CustomToolTip>
      </div>
    </div>
  );
}

const sidebarIconsData: SidebarNavItemProps[] = [
  {
    title: "Home",
    url: "/",
    icon: <Inbox />,
  },
  {
    title: "Analyze",
    url: "/analyze",
    icon: <PieChart />,
  },
  {
    title: "Settings",
    icon: <SettingsIcon />,
    url: "/settings/me",
  },
];
