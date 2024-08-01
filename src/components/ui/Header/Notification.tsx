import React from "react";
import CustomAvatar from "../CustomAvatar";
import { formatTimeStamps } from "@/helpers/time";
import { NotifcationType } from "@/types/types/types.main";
import Image from "next/image";

const Notification = ({ title, timestamp, id, img, text }: NotifcationType) => {
  return (
    <div className="item text-sm flex flex-col items-center gap-2">
      <div className="inline-flex gap-2">
        <CustomAvatar
          ImageUrl="https://github.com/shadcn.png"
          alt="Test User"
        />
        <div className="flex flex-col ">
          <h6>
            <span className="font-semibold">Himanshu </span>
            {title}
          </h6>
          <p>{formatTimeStamps(timestamp, false)}</p>
          <div className="p-2 rounded-md border">
            {img ? (
              <Image
                src={"/profile-image.webp"}
                alt="notification-image"
                width={50}
                height={50}
              ></Image>
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
