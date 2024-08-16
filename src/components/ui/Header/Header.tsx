import { Inbox, Settings } from "lucide-react";
import React from "react";
import CustomPopover from "../Popover/CustomPopover";
import Notification from "./Notification";
import { NotifcationType } from "@/types/types/types.main";
import { ScrollArea } from "../scroll-area";
import ProfilePopOver from "./ProfilePopOver";

const Header = () => {
  const NotificationData: NotifcationType[] = [
    {
      id: 1,
      title: "created new expense in Snacks",
      timestamp: new Date().getDate(),
      img: "/dark-theme.png",
    },
    {
      id: 2,
      title: "created new expense in Categories",
      timestamp: new Date().getDate(),
      text: "Bought Groceries from Reliance Fresh",
    },
  ];
  return (
    <div className="inline-flex items-center gap-4 justify-end w-full p-2 px-4 border-b-2">
      <CustomPopover
        className="w-full"
        trigger={
          <div className="notification relative inline-flex gap-1 items-center hover:bg-gray-200 p-1 px-2 transition-colors rounded-md">
            <div className="relative">
              <Inbox className="w-6 h-6 relative" />
              <div className="absolute left-0 top-0 w-2 h-2 bg-mainColor rounded-full"></div>
            </div>
            <p className="text-sm font-semibold">2 unread</p>
          </div>
        }
      >
        <h1>Notification</h1>
        <ScrollArea className="items flex-col flex gap-2 py-4 h-80 w-full">
          {NotificationData.map((notification: NotifcationType) => {
            return (
              <Notification
                key={notification.id}
                timestamp={notification.timestamp}
                title={notification.title}
                id={notification.id}
                img={notification?.img}
                text={notification?.text}
              />
            );
          })}
        </ScrollArea>
      </CustomPopover>
      <ProfilePopOver />
    </div>
  );
};

export default Header;
