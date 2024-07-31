import { Button } from "@/components/ui/button";
import { ChangePasswordDialog } from "@/components/ui/Dialog/ChangePasswordDialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectDropDown, {
  DropDownItemProps,
} from "@/components/ui/SelectDropDown";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import React from "react";

export default function page() {
  const userName = "John Doe";
  const aboutMe = "Discuss only about Coding, Gym, and Healthy Diet..✌";
  return (
    <div className="flex flex-col gap-8 p-4">
      <div className="Profile flex  gap-4 flex-col sm:flex-row items-center sm:items-end">
        <Image
          alt="profile-image"
          src={"/profile-image.webp"}
          width={100}
          height={100}
          className="rounded-full aspect-square object-cover"
        />
        <Button className="bg-mainColor">Change Picture</Button>
        <Button
          variant={"outline"}
          className="bg-red-100 text-red-500 border-red-200 hover:text-red-500"
        >
          Remove Picture
        </Button>
      </div>
      <div className="Name">
        <Label>Profile Name</Label>
        <Input placeholder="John Joe" value={userName} />
      </div>
      <div className="About flex flex-col gap-1 items-start">
        <Label>About me</Label>
        <Textarea
          placeholder="Tell us a little bit about yourself"
          className="resize-none h-48"
          value={aboutMe}
        />
      </div>
      <div className="Save w-full items-start">
        <Button className="bg-mainColor" disabled>
          Save
        </Button>
      </div>
    </div>
  );
}

const languageDropDown: DropDownItemProps[] = [
  {
    id: 1,
    title: "English",
    image: "/usa-english.png",
  },
];
