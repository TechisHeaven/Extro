import { Button } from "@/components/ui/button";
import SelectDropDown from "@/components/ui/SelectDropDown";
import { ArrowUp, Plus, Wallet } from "lucide-react";
import ExpenseCard from "./ExpenseCard";
import AreaChartLinear from "@/components/ui/Charts/AreaChartLinear";
import MainCard from "./MainCard";

export default function Home() {
  return (
    <main className=" min-h-screen p-4 w-full max-w-[1400px] m-auto">
      <div className="heading inline-flex items-center justify-between w-full">
        <div>
          <h3 className="text-2xl font-semibold">Welcome, Himanshu</h3>
          <h6 className="text-xs text-secondaryColor">
            Track, Manage and Explore all Expenses.
          </h6>
        </div>
        <div className="buttons inline-flex items-center gap-4">
          <SelectDropDown />
          <Button
            className="bg-mainColor text-sm inline-flex gap-2"
            size={"sm"}
          >
            <Plus className="w-4" />
            Add Expense
          </Button>
        </div>
      </div>
      <div className="cards grid grid-cols-3 m-4 gap-4">
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
