"use client";

import * as React from "react";
import SearchInput from "../Input/CustomInput";
import Debouncer from "@/helpers/debouncer";
import { useQuery } from "@tanstack/react-query";
import { fetchAll } from "@/services/expense/fetch";
import { formatTimeStamps } from "@/helpers/time";
import Table from "./TableMain";
import SpinnerLoader from "../loader";
import { Transaction } from "@/types/types/types.main";

export default function MainTable() {
  const { isPending, error, data } = useQuery<Transaction[], Error>({
    queryKey: ["fetchAll"],
    queryFn: fetchAll,
  });

  const [searchValue, setSearchValue] = React.useState("");

  const debouncedValue = Debouncer(searchValue, 500);
  function HandleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
  }

  // React.useEffect(() => {
  //   table.getColumn("name")?.setFilterValue(debouncedValue);
  // }, [debouncedValue, table]);

  const TestTableData: Transaction[] =
    data?.map((data) => ({
      category: data.category,
      name: data.name,
      amount: data.amount,
      timestamp: formatTimeStamps(Number(data.timestamp), true),
    })) || [];

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <div className="inline-flex w-full justify-between items-center">
          <h1 className="text-xl font-semibold">Expenses</h1>

          <div className="filters inline-flex gap-2 items-center">
            <SearchInput
              isDisabled={
                data?.length === 0 || data?.length == undefined ? true : false
              }
              placeholder="Search by Name, Catogery and etc."
              value={searchValue}
              onChange={HandleSearch}
              className="max-w-sm"
            />
          </div>
        </div>
      </div>
      <div className="rounded-md ">
        {isPending ? (
          <SpinnerLoader color="border-mainColor" size="small" />
        ) : (
          <Table searchTerm={searchValue} data={TestTableData} />
        )}
        {/* <TableComponent isPending={isPending} columns={columns} table={table} /> */}
      </div>
    </div>
  );
}
