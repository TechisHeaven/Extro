import { Button } from "@/components/ui/button";
import SelectDropDown from "@/components/ui/SelectDropDown";
import { Plus } from "lucide-react";
import ExpenseCard from "./ExpenseCard";

export default function Home() {
  return (
    <main className=" min-h-screen p-4 w-full">
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
      <div className="cards grid grid-cols-3 m-4">
        <ExpenseCard />
      </div>
    </main>
  );
}
