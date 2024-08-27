"use client";
import React from "react";
import MainCard from "./MainCard";
import ExpenseCard from "./ExpenseCard";
import { ArrowUp, Wallet } from "lucide-react";
import AreaChartLinear from "@/components/ui/Charts/AreaChartLinear";
import SetUpProfile from "@/components/ui/Containers/SetUpProfile";
import CreateFirstExpense from "@/components/ui/Containers/CreateFirstExpense";
import ConnectWalletContainer from "@/components/ui/Containers/ConnectWalletContainer";
import { useUserContext } from "@/providers/user.provider";
import { useExpenseContext } from "@/providers/expense.provider";
import { Skeleton } from "@/components/ui/skeleton";

const MainCardContainer = () => {
  const state = useUserContext();
  const username = state?.user?.name;
  const userLoading = state?.loading;
  const expesesState = useExpenseContext();
  const expenses = expesesState?.expenses;
  const expensesLoading = expesesState?.loading;
  const expensesExists = expenses && expenses.length > 0;
  return (
    <>
      {userLoading ? (
        <ContainerSkeleton />
      ) : !username ? (
        <SetUpProfile />
      ) : (
        <MainCard title="Total Expense">
          <ExpenseCard />
        </MainCard>
      )}
      {expensesLoading ? (
        <ContainerSkeleton />
      ) : !expensesExists ? (
        <CreateFirstExpense />
      ) : (
        <AnalyzeExpense />
      )}
      <ConnectWalletContainer />
    </>
  );
};

export default MainCardContainer;

const AnalyzeExpense = () => {
  return (
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
  );
};

const ContainerSkeleton = () => {
  return (
    <MainCard className="w-full">
      <div className="flex flex-col space-y-3">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[200px]" />
        </div>
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      </div>
    </MainCard>
  );
};
