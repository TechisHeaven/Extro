import { Button } from "@/components/ui/button";
import { ChangePasswordDialog } from "@/components/ui/Dialog/ChangePasswordDialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectDropDown, {
  DropDownItemProps,
} from "@/components/ui/SelectDropDown";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import PricingCard, { PricingProps } from "./pricingCard";
import InvoiceTab from "./InvoiceTab";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function page() {
  return (
    <div className="flex flex-col gap-8 p-4">
      <div>
        <h1 className="font-semibold text-xl">Pricing & Billings</h1>
        <p className="text-secondaryColor text-xs">
          Manage your plan and billing history here.
        </p>
      </div>

      <div className="pricing grid grid-cols-1 sm:grid-cols-2 gap-2">
        {PricingPlans.map((item) => {
          return (
            <PricingCard
              key={item.id}
              isCurrentPlan={item.isCurrentPlan}
              plan={item.plan}
            />
          );
        })}
      </div>
      <div className="AutoRenew inline-flex justify-between w-full items-start">
        <div>
          <Label>Auto Renew</Label>
          <p className="text-xs text-secondaryColor">
            Once auto renew is enable, membership auto renew when it will done.
          </p>
        </div>
        <Switch className="data-[state=checked]:bg-mainColor " />
      </div>

      <div className="history">
        <h1 className="font-semibold">Billing history</h1>
        <ScrollArea className="invoices flex flex-col gap-2 my-2 h-72">
          {Invoices.map((item) => {
            return (
              <InvoiceTab
                key={item.id}
                title={item.title}
                timestamps={item.timestamps}
              />
            );
          })}
        </ScrollArea>
      </div>
    </div>
  );
}

const PricingPlans: PricingProps[] = [
  {
    id: 1,
    plan: "basic",
    isCurrentPlan: true,
  },
  {
    id: 2,
    plan: "pro",
    isCurrentPlan: false,
  },
];

const Invoices = [
  {
    id: 1,
    title: "Invoice 0001",
    timestamps: new Date().getTime(),
  },
  {
    id: 2,
    title: "Invoice 0001",
    timestamps: new Date().getTime(),
  },
];
