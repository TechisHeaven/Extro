import React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Coins, CreditCard, Plus, ScanQrCode } from "lucide-react";
import { DateTimePicker } from "./TimePickerMain";
import { Input } from "../input";
import SelectDropDown from "../SelectDropDown";

export default function AddExpense() {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            className="bg-mainColor text-sm inline-flex gap-2"
            size={"sm"}
          >
            <Plus className="w-4" />
            Add Expense
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add Expense</SheetTitle>
            <SheetDescription>
              Add New Daily Expense in your Profile. Click save when you&apos;re
              done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4 place-items-center w-full">
            <div className="catogeries inline-flex items-center justify-between">
              <SelectDropDown
                className="rounded-full bg-mainColor text-white"
                items={SelectItemsPayment}
              />
              <SelectDropDown
                className="rounded-full "
                items={SelectItemsCatogeries}
              />
            </div>
            <div className="border-b-2 inline-flex gap-2 items-end font-semibold my-20">
              <span className="text-lg text-secondaryColor">$</span>
              <input
                type="number"
                name="price"
                id="price"
                placeholder="1200.00"
                className="text-4xl outline-none w-fit max-w-40"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Input type="text" placeholder="Add Title" />
              <DateTimePicker />
            </div>
          </div>
          <SheetFooter className="inline-flex justify-between w-full">
            <Button className="inline-flex gap-2 items-center bg-mainColor">
              Scan <ScanQrCode />
            </Button>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

const SelectItemsPayment = [
  {
    id: 1,
    title: "Card",
    icon: <CreditCard className="w-4 h-4" />,
  },
  {
    id: 2,
    title: "Cash",
    icon: <Coins className="w-4 h-4" />,
  },
];
const SelectItemsCatogeries = [
  {
    id: 1,
    title: "Groceries",
    image: "/avacado.png",
  },
  {
    id: 2,
    title: "Snacks",
    image: "/snacks.png",
  },
];
