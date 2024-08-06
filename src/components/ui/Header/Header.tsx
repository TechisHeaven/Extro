import { Inbox, Settings } from "lucide-react";
import React from "react";
import CustomAvatar from "../CustomAvatar";
import CustomPopover from "../Popover/CustomPopover";
import Image from "next/image";
import TextCopyComponent from "../Table/TextCopyComponent";
import Link from "next/link";
import { Button } from "../button";
import Notification from "./Notification";
import { NotifcationType } from "@/types/types/types.main";
import { ScrollArea } from "../scroll-area";
import Logout from "./Logout";

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
      <CustomPopover
        trigger={
          <CustomAvatar
            ImageUrl="https://github.com/shadcn.png"
            alt="Test User"
          />
        }
      >
        <div>
          <div className="heading-section-profile select-none inline-flex items-center justify-between">
            <div className="info">
              <h5 className="font-semibold">Himanshu</h5>
              <p className="text-sm truncate max-w-52 w-fit ">
                vermajihimanshu2004@gmail.com
              </p>
            </div>
            <Image
              className="object-cover rounded-full aspect-square"
              src={"/profile-image.webp"}
              alt="profile-image"
              width={40}
              height={40}
            ></Image>
          </div>
          <div className="heading-section-profile select-none inline-flex items-center justify-between">
            <div className="info">
              <h5 className="font-semibold text-sm">Wallet Address</h5>
              <TextCopyComponent text="0x80ad6ba2b620d2bb89bd35147e00278331e55922" />
            </div>
          </div>
          <hr />
          <div className="nav-items my-2 w-full flex flex-col gap-2">
            <Link
              href={"/settings/me"}
              className="px-4 p-2 inline-flex w-full items-center gap-2 hover:bg-gray-200 transition-colors rounded-md"
            >
              <Settings className="w-4  h-4" />
              User Profile
            </Link>
            <Link
              href={"/settings/account"}
              className="px-4 p-2 inline-flex w-full items-center gap-2 hover:bg-gray-200 transition-colors rounded-md"
            >
              <Settings className="w-4  h-4" />
              Help Center
            </Link>
            <Logout />
          </div>
        </div>
      </CustomPopover>
    </div>
  );
};

export default Header;
