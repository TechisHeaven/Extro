import { formatTimeStamps } from "@/helpers/time";
import { Transaction } from "@/types/types/types.main";
import { Coins } from "lucide-react";
import Image from "next/image";
import React from "react";

interface TransactionContainerProps {
  transaction: Transaction;
}

const categoryImages = {
  groceries: "/avacado.png",
  snacks: "/snacks.png",
  // add other categories and their images
};

const TransactionContainer = ({ transaction }: TransactionContainerProps) => {
  const time = transaction.timestamp;
  const amount = transaction.amount;
  const category = transaction.category;
  const categoryImage = categoryImages[transaction.category];
  const name = transaction.name;

  return (
    <div className="container p-8">
      <h1 className="font-semibold text-xl">Transaction Details</h1>
      <div className="flex flex-col gap-4">
        <div className="inline-flex items-center justify-between w-full py-2">
          <div className="inline-flex items-center gap-2 font-semibold">
            <Coins className="w-4 h-4" />
            Cash
          </div>
          <p className="text-secondaryColor text-xs">{time}</p>
        </div>
        <hr />
        <div className="rounded-md p-2 bg-gray-100 flex flex-col gap-2">
          <div className="price">
            <h1 className="text-2xl font-semibold">${amount}</h1>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold">Payment Info</h1>
            <div>
              <h6 className="font-semibold">Description</h6>
              {name}
            </div>
            <div>
              <h6 className="font-semibold">Type</h6>
              <div className="inline-flex items-center gap-2">
                <Image
                  src={categoryImage}
                  alt={category}
                  className="w-6 h-6"
                  width={24}
                  height={24}
                />
                {category}
              </div>
            </div>
          </div>
        </div>
        <div className="receipt p-2 bg-gray-100 rounded-md">
          <h6 className="font-semibold">Receipts</h6>
          <div className="images py-2 ">
            <Image
              width={75}
              height={75}
              alt="receipts"
              src={"/light-theme.png"}
              className="rounded-md border-dotted border object-cover"
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionContainer;
