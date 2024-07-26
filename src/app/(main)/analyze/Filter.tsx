import SelectDropDown from "@/components/ui/SelectDropDown";
import React from "react";

export default function Filter() {
  return (
    <div className="inline-flex items-center gap-2">
      <SelectDropDown items={SelectItemsWeekdays} />
      <SelectDropDown items={SelectItemsWeekdays} />
      <SelectDropDown items={SelectItemsWeekdays} />
    </div>
  );
}
const SelectItemsWeekdays = [
  {
    id: 1,
    title: "Week",
  },
  {
    id: 2,
    title: "Month",
  },
  {
    id: 3,
    title: "Year",
  },
];
