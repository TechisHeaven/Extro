"use client";
import { toast } from "sonner";
import SelectDropDown from "../SelectDropDown";
import { Input } from "../input";
import { DateTimePicker } from "./TimePickerMain";
import { SheetClose, SheetFooter } from "../sheet";
import HandleClickScanButton from "./handleClickScanButton";
import { Button } from "../button";
import { Coins, CreditCard } from "lucide-react";

const AddExpenseComponent = () => {
  //handle submit function
  function handleSubmit() {
    toast.success("Expense Created!");
  }
  return (
    <>
      <div className="grid gap-4 py-4 place-items-center w-full">
        <div className="catogeries inline-flex items-center justify-between">
          <SelectDropDown
            className="rounded-full bg-mainColor text-white"
            items={SelectItemsPayment}
          />
          <SelectDropDown
            className="rounded-full"
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
        <HandleClickScanButton />
        <SheetClose asChild>
          <Button onClick={handleSubmit} type="submit">
            Save changes
          </Button>
        </SheetClose>
      </SheetFooter>
    </>
  );
};

export default AddExpenseComponent;

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
