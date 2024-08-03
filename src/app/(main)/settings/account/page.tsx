import { Button } from "@/components/ui/button";
import { ChangePasswordDialog } from "@/components/ui/Dialog/ChangePasswordDialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectDropDown, {
  DropDownItemProps,
} from "@/components/ui/SelectDropDown";
import { Switch } from "@/components/ui/switch";
import React from "react";

export default function Account() {
  return (
    <div className="flex flex-col gap-8 p-4">
      <div className="Email">
        <Label>Email</Label>
        <Input placeholder="John@doe.com" />
      </div>
      <div className="Password flex flex-col gap-1 items-start">
        <Label>Password</Label>
        <ChangePasswordDialog />
      </div>
      <div className="Language flex flex-col gap-1 items-start">
        <Label>Language</Label>
        <SelectDropDown items={languageDropDown} />
      </div>
      <div className="2FA inline-flex justify-between w-full items-start">
        <div>
          <Label>2 Factor Authentication</Label>
          <p className="text-xs text-secondaryColor">
            Once you login, we will send you a notification email.
          </p>
        </div>
        <Switch className="data-[state=checked]:bg-mainColor " />
      </div>
      <div className="RemoveAccount w-full items-start">
        <Label>Remove Account</Label>
        <p className="text-xs text-secondaryColor">
          You can do &ldquo;Disable Account&ldquo; to take a break from our
          platform.
        </p>
      </div>
      <div className="inline-flex gap-2">
        <Button variant={"destructive"}>Disable account</Button>
        <Button
          variant={"outline"}
          className="bg-red-100 text-red-500 border-red-200"
        >
          Delete account
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
