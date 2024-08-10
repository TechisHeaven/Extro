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
import { logout } from "@/actions/auth/action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SidebarMain = () => {
  //handle Logout User
  const router = useRouter();
  async function handleLogout() {
    await logout();
    router.push("/login");
    toast.success("Logout Successfully!");
  }
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
          <a href="mailto:techisHeaven@outlook.com?subject=Help Query&body=Write your query here or to reach out us.">
            <HelpCircle />
          </a>
        </CustomToolTip>
        <CustomToolTip content="Logout">
          <LogOut onClick={handleLogout} />
        </CustomToolTip>
      </div>
    </div>
  );
};

export default SidebarMain;

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
