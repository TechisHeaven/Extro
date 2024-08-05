import React from "react";
import MainCard from "./MainCard";
import ExpenseCard from "./ExpenseCard";
import { ArrowUp, Wallet } from "lucide-react";
import AreaChartLinear from "@/components/ui/Charts/AreaChartLinear";
import { Button } from "@/components/ui/button";
import SetUpProfile from "@/components/ui/Containers/SetUpProfile";
import CreateFirstExpense from "@/components/ui/Containers/CreateFirstExpense";
import ConnectWalletContainer from "@/components/ui/Containers/ConnectWalletContainer";

const MainCardContainer = () => {
  const isOnBoarding = true;

  return isOnBoarding ? (
    <>
      <SetUpProfile />
      <CreateFirstExpense />
      <ConnectWalletContainer />
    </>
  ) : (
    <>
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
    </>
  );
};

export default MainCardContainer;
