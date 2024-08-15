import SelectDropDown from "@/components/ui/SelectDropDown";
import React, { Suspense } from "react";
import AddExpense from "@/components/ui/Expense/AddExpense";
import { cn } from "@/lib/utils";
import MainCardContainer from "./MainCardContainer";
import AddExpenseComponent from "@/components/ui/Expense/AddExpenseComponents";
import Heading from "@/components/ui/Dashboard/Heading";

export default function Home() {
  return (
    <main className=" p-4 w-full max-w-[1400px] m-auto">
      <div className="heading inline-flex items-center justify-end sm:justify-between w-full">
        <div className="hidden sm:block">
          <Suspense fallback={"loading heading"}>
            <Heading />
          </Suspense>
          <h6 className="text-xs text-secondaryColor">
            Track, Manage and Explore all Expenses.
          </h6>
        </div>
        <div className="buttons inline-flex items-center gap-4">
          <SelectDropDown items={SelectItemsWeekdays} />
          <AddExpense>
            <AddExpenseComponent />
          </AddExpense>
        </div>
      </div>
      <div className="mobileView  text-center flex sm:hidden flex-col gap-2 my-4">
        <h6 className="text-sm text-secondaryColor font-semibold">
          Spend this Week
        </h6>
        <h1 className="text-6xl font-semibold">
          <span className="text-lg text-secondaryColor">$</span>12,000.
          <span className="text-lg">00</span>
        </h1>
      </div>
      <div className={cn("cards  grid-cols-3 m-4 gap-4 hidden sm:grid")}>
        <MainCardContainer />
      </div>
    </main>
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
