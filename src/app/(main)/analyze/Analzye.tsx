import SelectDropDown from "@/components/ui/SelectDropDown";
import React from "react";
import BarChartComponent from "./BarCart";
import Filter from "./Filter";
import { ArrowDown } from "lucide-react";

export default function Analzye() {
  return (
    <div className="flex-col flex gap-4">
      <div className="inline-flex items-center gap-4">
        <div>
          <h1 className="text-4xl font-semibold">$3200.00</h1>
          <p className="whitespace-nowrap text-xs text-secondaryColor inline-flex items-center gap-2">
            Total Spending this week
            <span className="text-green-500 inline-flex items-center gap-2">
              <span className="Circle bg-green-200 p-1 rounded-full aspect-square relative w-8">
                <ArrowDown className="w-4 translate-x-1/2 left-0 absolute" />
              </span>
              18%
            </span>
          </p>
        </div>
        <SelectDropDown items={SelectItemsWeekdays} />
      </div>
      <BarChartComponent />
      <Filter />
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
