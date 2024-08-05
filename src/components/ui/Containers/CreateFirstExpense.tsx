import MainCard from "@/app/(main)/MainCard";
import React from "react";
import HoverCardComponent from "../HoverCard/HoverCard";
import { Button } from "../button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import AddExpense from "../Expense/AddExpense";

const SETTING_LINK = "/settings/me";

const CreateFirstExpense = () => {
  return (
    <MainCard
      badge="1 Min Technical"
      className="w-full"
      description="create your first expense from your expense details."
      title="Create your first expense."
    >
      <div className="justify-between items-center inline-flex w-full">
        <HoverCardComponent
          trigger={
            <Button className="p-2 px-4" variant="link">
              Learn More <ChevronRight className="w-4 h-4 " />
            </Button>
          }
        >
          <div className="flex justify-between space-x-4">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">Learn more</h4>
              <p className="text-sm">
                In Extro your can create your Expense easly with minimal
                Details.
              </p>
            </div>
          </div>
        </HoverCardComponent>
        <AddExpense />
      </div>
    </MainCard>
  );
};

export default CreateFirstExpense;
