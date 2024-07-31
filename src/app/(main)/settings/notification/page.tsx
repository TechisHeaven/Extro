import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="notification inline-flex justify-between w-full items-start">
        <div>
          <Label htmlFor="popup-notification">
            Popup Notification on Desktop
          </Label>
        </div>
        <Switch
          id="popup-notification"
          checked
          className="data-[state=checked]:bg-mainColor "
        />
      </div>
      <div className="notification inline-flex justify-between w-full items-start">
        <div>
          <Label htmlFor="updates-notification">
            Turn on new updates notification
          </Label>
        </div>
        <Switch
          id="updates-notification"
          className="data-[state=checked]:bg-mainColor "
        />
      </div>
    </div>
  );
}
