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

const MainCardContainer = () => {
  const state = useUserContext();
  const username = state?.user?.name;
  return (
    <>
      {!username ? (
        <SetUpProfile />
      ) : (
        <MainCard title="Total Expense">
          <ExpenseCard />
        </MainCard>
      )}

      <CreateFirstExpense />
      <ConnectWalletContainer />
      {/* <AnalyzeExpense /> */}
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
