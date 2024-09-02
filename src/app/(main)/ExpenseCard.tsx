import { CurrentExpenses } from "@prisma/client";
import { ArrowUp } from "lucide-react";
import React from "react";

const ExpenseCard = ({
  CurrentExpense,
}: {
  CurrentExpense?: CurrentExpenses;
}) => {
  const yearExpense = CurrentExpense?.yearExpense || 0;
  const monthExpense = CurrentExpense?.monthExpense || 0;
  const weekExpense = CurrentExpense?.weekExpense || 0;
  return (
    <div className="flex flex-col justify-end gap-4 h-full">
      <div className="inline-flex items-end justify-between">
        <h5 className="text-4xl font-semibold">
          ₹{weekExpense}
          <span className="text-xs text-secondaryColor">/20k</span>
        </h5>
        <h6 className="text-xs text-secondaryColor">This Month</h6>
      </div>
      <div className="progressbar rounded-full w-full bg-gray-200 h-4 overflow-hidden relative">
        <div className="absolute w-3/4 h-4 bg-mainColor"></div>
      </div>
      <div className="more-info inline-flex items-center gap-4 text-xs text-secondaryColor">
        <span className=" text-green-400 inline-flex items-center">
          <ArrowUp className="w-4" />
          18%
        </span>
        vs last week
      </div>
    </div>
  );
};

export default ExpenseCard;
