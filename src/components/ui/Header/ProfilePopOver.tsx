"use client";
import React from "react";
import Logout from "./Logout";
import { Settings } from "lucide-react";
import Image from "next/image";
import TextCopyComponent from "../Table/TextCopyComponent";
import Link from "next/link";
import CustomAvatar from "../CustomAvatar";
import CustomPopover from "../Popover/CustomPopover";
import { useSession } from "next-auth/react";
import { Skeleton } from "../skeleton";
import { useUserContext } from "@/providers/user.provider";

export default function ProfilePopOver() {
  // const { data: state } = useSession();
  const state = useUserContext();

  return state ? (
    <CustomPopover
      trigger={
        <CustomAvatar
          ImageUrl={state?.user?.image || ""}
          alt={state?.user?.name || "U"}
        />
      }
    >
      <div>
        <div className="heading-section-profile select-none inline-flex items-center justify-between">
          <div className="info">
            <h5 className="font-semibold">{state?.user?.name || "User"}</h5>
            <p className="text-sm truncate max-w-52 w-fit ">
              {state?.user?.email}
            </p>
          </div>

          <CustomAvatar
            ImageUrl={state?.user?.image || ""}
            alt={state?.user?.name || "U"}
          />
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
  ) : (
    <Skeleton className="w-[40px] h-[40px] rounded-full" />
  );
}
