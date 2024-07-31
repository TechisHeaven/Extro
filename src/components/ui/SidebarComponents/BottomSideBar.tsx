import React from "react";
import SidebarNavItem, { SidebarNavItemProps } from "./SidebarNavItem";
import { Inbox, PieChart, SettingsIcon } from "lucide-react";

const BottomSideBar = () => {
  return (
    <div className="inline-flex justify-around w-dvw fixed bottom-0 bg-white z-50 p-4 pb-8 border">
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
  );
};

export default BottomSideBar;

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
