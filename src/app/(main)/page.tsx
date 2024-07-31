import { Button } from "@/components/ui/button";
import SelectDropDown from "@/components/ui/SelectDropDown";
import { ArrowUp, Plus, Wallet } from "lucide-react";
import ExpenseCard from "./ExpenseCard";
import AreaChartLinear from "@/components/ui/Charts/AreaChartLinear";
import MainCard from "./MainCard";
import React from "react";
import AddExpense from "@/components/ui/Expense/AddExpense";
import { cn } from "@/lib/utils";

export default async function Home() {
  return (
    <main className=" p-4 w-full max-w-[1400px] m-auto">
      <div className="heading inline-flex items-center justify-end sm:justify-between w-full">
        <div className="hidden sm:block">
          <h3 className="text-2xl font-semibold">Welcome, Himanshu</h3>
          <h6 className="text-xs text-secondaryColor">
            Track, Manage and Explore all Expenses.
          </h6>
        </div>
        <div className="buttons inline-flex items-center gap-4">
          <SelectDropDown items={SelectItemsWeekdays} />
          <AddExpense />
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
        <MainCard title="Total Expense">
          <ExpenseCard />
        </MainCard>
        <MainCard title="Analyze Expense">
          <div className="flex flex-col justify-center text-4xl font-semibold">
            <h4>
              120
              <span className="text-xs text-green-500 font-semibold inline-flex items-center gap-1">
                <ArrowUp className="w-4" />
                18%
              </span>
            </h4>
            <p className="text-xs text-secondaryColor">This week</p>
          </div>
          <AreaChartLinear />
        </MainCard>
        <MainCard
          title="Wallet"
          className="inline-flex items-center justify-center w-full"
        >
          <Button className="inline-flex items-center gap-2 text-sm bg-mainColor">
            <Wallet className="w-4" />
            Connect Wallet
          </Button>
        </MainCard>
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
