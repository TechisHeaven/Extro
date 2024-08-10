import { CustomDialog } from "@/components/ui/Dialog/CustomDialog";
import React from "react";
import {
  Bell,
  Coins,
  Inbox,
  Laptop,
  Search,
  SettingsIcon,
  User,
} from "lucide-react";
import SearchInput from "@/components/ui/Input/CustomInput";
import SideBarItem from "@/components/ui/Settings/SideBarItem";
import BackButton from "@/components/ui/Buttons/BackButton";

export default function SettingDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CustomDialog
      goBack
      className=" md:max-w-screen-md max-h-[100dvh] sm:max-h-[80dvh] md:max-h-[80dvh] h-full"
    >
      <div className="inline-flex gap-0 sm:gap-0 md:gap-4 w-full">
        <div className="Sidebar w-fit sm:w-fit md:w-full max-w-48 p-2">
          <div className="inline-flex items-center">
            <BackButton />
            <h1 className="font-semibold text-2xl select-none p-4 hidden sm:block">
              Settings
            </h1>
          </div>
          <div className="sidebar-items py-4 flex flex-col gap-2 ">
            {sidebarIconsData.map((item, index: number) => {
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
        <div className="w-full p-0 sm:p-0 md:p-4">
          <div className="Header p-4 inline-flex justify-between w-full">
            <div className="search w-full">
              <SearchInput
                autoFocus={false}
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

const sidebarIconsData = [
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
  {
    title: "Pricing",
    url: "/settings/pricing",
    icon: <Coins className="w-4" />,
  },
  {
    title: "Notification",
    url: "/settings/notification",
    icon: <Bell className="w-4" />,
  },
];
