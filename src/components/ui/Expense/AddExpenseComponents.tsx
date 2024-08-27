"use client";
import { toast } from "sonner";
import SelectDropDown from "../SelectDropDown";
import { Input } from "../input";
import { DateTimePicker } from "./TimePickerMain";
import { SheetFooter } from "../sheet";
import HandleClickScanButton from "./handleClickScanButton";
import { Button } from "../button";
import { Coins, CreditCard } from "lucide-react";
import { createExpense } from "@/actions/expense/action";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { useQueryClient } from "@tanstack/react-query";

const TypeEnum = z.enum(["CARD", "CASH"]);
const CategoryEnum = z.enum(["GROCERIES", "SNACKS"]);
const ExpenseSchema = z.object({
  title: z.string().min(1, { message: "Title Must be Provided" }),
  price: z.string().min(1, { message: "Price must be Provided" }),
  type: TypeEnum,
  category: CategoryEnum,
  images: z.string().array().optional(),
  expenseTime: z.date().optional(),
});

export type ExpenseType = z.infer<typeof ExpenseSchema>;

const AddExpenseComponent = () => {
  type userSessionType = {
    id: string;
    name: string;
    email: string;
    image: string;
  } & Session["user"];
  const { data } = useSession();
  const user: userSessionType | undefined | any = data?.user;
  const [, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ExpenseType>({
    mode: "onChange",
    resolver: zodResolver(ExpenseSchema),
  });

  //handle submit function
  const onSubmit = handleSubmit((data: ExpenseType) => {
    startTransition(async () => {
      if (!user) {
        toast.error("User is not logged in");
        return;
      }
      const userId = Number(user?.id);
      const response = await createExpense(data, userId);
      if (response?.status === 201) {
        toast.success(response.message);
        queryClient.invalidateQueries({
          queryKey: ["fetchAll"],
        });
        reset();
        return;
      }
      if (response?.error) {
        toast.error(response.error);
        console.log(response.error);
      }
    });
  });

  useEffect(() => {
    if (errors) {
      if (errors.price) {
        toast.error("Price is Empty.");
        return;
      }
      if (errors.title) {
        toast.error("Title is Empty.");
        return;
      }
      if (errors.category) {
        toast.error("Choose a category please.");
        return;
      }
      if (errors.type) {
        toast.error("Choose a type please.");
        return;
      }

      if (errors.expenseTime) {
        toast.error("Choose a expenseTime please.");
        return;
      }
    }
  }, [errors]);

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4 py-4 place-items-center w-full">
          <div className="catogeries inline-flex items-center justify-between">
            <SelectDropDown
              setValue={setValue}
              name="type"
              className="rounded-full bg-mainColor text-white"
              items={SelectItemsPayment}
            />
            <SelectDropDown
              name="category"
              setValue={setValue}
              className="rounded-full"
              items={SelectItemsCatogeries}
            />
          </div>
          <div className="border-b-2 inline-flex gap-2 items-end font-semibold my-20">
            <span className="text-lg text-secondaryColor">$</span>
            <input
              {...register("price")}
              type="number"
              name="price"
              id="price"
              placeholder="1200.00"
              className="text-4xl outline-none w-fit max-w-40"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Input {...register("title")} type="text" placeholder="Add Title" />
            <DateTimePicker setValue={setValue} />
          </div>
        </div>
        <SheetFooter className="inline-flex justify-between w-full">
          <HandleClickScanButton />
          <Button type="submit">{isSubmitting ? "Saving..." : "Save"}</Button>
        </SheetFooter>
      </form>
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
    title: "CASH",
    icon: <Coins className="w-4 h-4" />,
  },
];
const SelectItemsCatogeries = [
  {
    id: 1,
    title: "GROCERIES",
    image: "/avacado.png",
  },
  {
    id: 2,
    title: "SNACKS",
    image: "/snacks.png",
  },
];
