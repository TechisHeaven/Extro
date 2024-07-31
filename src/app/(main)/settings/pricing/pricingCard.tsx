import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

export type PricingProps = {
  id?: string | number;
  plan: "basic" | "pro";
  isCurrentPlan: boolean;
};
const PricingCard = ({ plan, isCurrentPlan }: PricingProps) => {
  const isBasicPlan = plan === "basic";
  return isBasicPlan ? (
    <BasicPlanCard isCurrentPlan={isCurrentPlan} />
  ) : (
    <ProPlanCard isCurrentPlan={isCurrentPlan} />
  );
};

export default PricingCard;

const BasicPlanCard = ({ isCurrentPlan }: { isCurrentPlan: boolean }) => {
  return (
    <div className="card border rounded-md p-2 w-full flex flex-col gap-2">
      <h1 className="font-semibold text-xl">Basic Plan </h1>
      <p className="text-secondaryColor text-xs">up to 2 team members.</p>
      <h1 className="font-semibold text-xl">
        Free <span className="text-xs text-secondaryColor">per month</span>
      </h1>
      {isCurrentPlan ? (
        <Button
          disabled
          className={cn("bg-gray-200 text-black", "inline-flex w-full")}
        >
          Current Plan
        </Button>
      ) : (
        <Button className={cn("bg-mainColor", "inline-flex w-full")}>
          Upgrade Plan
        </Button>
      )}
    </div>
  );
};
const ProPlanCard = ({ isCurrentPlan }: { isCurrentPlan: boolean }) => {
  return (
    <div className="card border rounded-md p-2 w-full flex flex-col gap-2">
      <h1 className="font-semibold text-xl">Pro Plan </h1>
      <p className="text-secondaryColor text-xs">unlimited team members.</p>
      <h1 className="font-semibold text-xl">
        $20 <span className="text-xs text-secondaryColor">per month</span>
      </h1>
      {isCurrentPlan ? (
        <Button
          disabled
          className={cn("bg-gray-200 text-black", "inline-flex w-full")}
        >
          Current Plan
        </Button>
      ) : (
        <Button className={cn("bg-mainColor", "inline-flex w-full")}>
          Upgrade Plan
        </Button>
      )}
    </div>
  );
};
