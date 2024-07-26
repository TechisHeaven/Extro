import MainTable, { Transaction } from "@/components/ui/Table/MainTable";
import React from "react";
import { fetchAll } from "../../../../services/expense/fetch";

export default async function page() {
  return (
    <div className="p-4 w-full max-w-[1400px] m-auto">
      <MainTable />
    </div>
  );
}
