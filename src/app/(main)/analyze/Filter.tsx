import SelectDropDown from "@/components/ui/SelectDropDown";
import React from "react";

export default function Filter() {
  return (
    <div className="inline-flex items-center gap-2">
      <SelectDropDown />
      <SelectDropDown />
      <SelectDropDown />
    </div>
  );
}
