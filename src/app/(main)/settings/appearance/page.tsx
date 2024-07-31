import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import SelectDropDown, {
  DropDownItemProps,
} from "@/components/ui/SelectDropDown";
import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col gap-8 p-4">
      <div className="Name flex flex-col gap-2">
        <Label>Preference mode</Label>
        <RadioGroup
          defaultValue="light-Preference"
          className="inline-flex items-center gap-2"
        >
          <div className="light-theme cursor-pointer flex flex-col items-center space-x-2 border rounded-md overflow-hidden ">
            <Label
              htmlFor="light-Preference"
              className="flex flex-col items-center"
            >
              <div className="p-4 bg-gray-200">
                <Image
                  width={200}
                  height={200}
                  alt="theme-image"
                  src={"/light-theme.png"}
                />
              </div>
              <RadioGroupItem
                value="light-Preference"
                id="light-Preference"
                className="m-4"
              />
            </Label>
          </div>
          <div className="dark-theme cursor-pointer flex flex-col items-center space-x-2 border rounded-md overflow-hidden ">
            <Label
              htmlFor="dark-Preference"
              className="flex flex-col items-center"
            >
              <div className="p-4 bg-gray-200">
                <Image
                  width={200}
                  height={200}
                  alt="theme-image"
                  src={"/dark-theme.png"}
                />
              </div>
              <RadioGroupItem
                value="dark-Preference"
                id="dark-Preference"
                className="m-4"
              />
            </Label>
          </div>
        </RadioGroup>
      </div>
      <div className="Font Size">
        <Label>Preference mode</Label>
        <SelectDropDown items={fontSizeDropDown} />
      </div>
    </div>
  );
}
const fontSizeDropDown: DropDownItemProps[] = [
  {
    id: 1,
    title: "Small",
  },
  {
    id: 1,
    title: "Medium",
  },
  {
    id: 1,
    title: "Large",
  },
];
