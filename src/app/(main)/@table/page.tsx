import { getExpenses } from "@/actions/expense/action";
import MainTable from "@/components/ui/Table/MainTable";
import React from "react";

export default async function page() {
  return (
    <div className="p-4 w-full max-w-[1400px] m-auto">
      <MainTable />
    </div>
  );
}
