import React from "react";
import CustomAvatar from "../CustomAvatar";
import { formatTimeStamps } from "@/helpers/time";
import { NotifcationType } from "@/types/types/types.main";
import Image from "next/image";
import { CloudDownload } from "lucide-react";

const Notification = ({ title, timestamp, id, img, text }: NotifcationType) => {
  return (
    <div className="item group text-sm flex flex-col items-center gap-2 hover:bg-gray-200 p-2 transition-colors rounded-md">
      <div className="inline-flex gap-2">
        <CustomAvatar
          ImageUrl="https://github.com/shadcn.png"
          alt="Test User"
        />
        <div className="flex flex-col">
          <h6>
            <span className="font-semibold">Himanshu </span>
            {title}
          </h6>
          <p>{formatTimeStamps(timestamp, false)}</p>
          <div className="p-2 rounded-md border group-hover:bg-white">
            {img ? (
              <div className="inline-flex items-center gap-2 w-full">
                <Image
                  src={"/profile-image.webp"}
                  alt="notification-image"
                  width={50}
                  height={50}
                />
                <div className="title relative text-xs w-full">
                  <h6 className="font-semibold truncate max-w-40 w-full">
                    Grocery Image.png
                  </h6>
                  <p className=" text-secondaryColor">128 KB</p>
                  <CloudDownload className="text-secondaryColor w-4 absolute right-0 top-0" />
                </div>
              </div>
            ) : (
              <p>{text}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
