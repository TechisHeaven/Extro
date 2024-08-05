import MainCard from "@/app/(main)/MainCard";
import React from "react";
import HoverCardComponent from "../HoverCard/HoverCard";
import { Button } from "../button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const SETTING_LINK = "/settings/me";

const SetUpProfile = () => {
  return (
    <MainCard
      badge="1 Min non-Technical"
      className="w-full"
      description="set up with relevant information such as profile picture, name etc."
      title="Set up your profile"
    >
      <div className="justify-between items-center inline-flex w-full">
        <HoverCardComponent
          trigger={
            <Button className="p-2 px-4" variant="link">
              Learn More <ChevronRight className="w-4 h-4 " />
            </Button>
          }
        >
          <div className="flex justify-between space-x-4">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">Learn more</h4>
              <p className="text-sm">
                Complete your profile with simple details like name, profile
                picture and etc.
              </p>
            </div>
          </div>
        </HoverCardComponent>
        <Button className="bg-mainColor px-4">
          <Link href={SETTING_LINK}>Settings</Link>
        </Button>
      </div>
    </MainCard>
  );
};

export default SetUpProfile;
