"use client";

import * as React from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

import SearchInput from "../Input/SearchInput";
import TableComponent from "./CustomTableComponent";
import { columns } from "./columns.data";
import Debouncer from "@/helpers/debouncer";
import { useQuery } from "@tanstack/react-query";
import { fetchAll } from "@/services/expense/fetch";
import { useWindowSize } from "@/hooks/windowSize";
import { formatTimeStamps } from "@/helpers/time";
import Table from "./TableMain";
import SpinnerLoader from "../loader";
import { Transaction } from "@/types/types/types.main";

export default function MainTable() {
  const windowSize = useWindowSize();
  const isMobileView = windowSize.width <= 600 ? true : false;
  // const executeFetch = useAbortableFetch(fetchAll);
  const { isPending, error, data } = useQuery<Transaction[], Error>({
    queryKey: ["fetchAll"],
    queryFn: fetchAll,
  });

  // const [state, formAction, isPending] = useFormState(fetchAll, initialState);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [searchValue, setSearchValue] = React.useState("");

  const debouncedValue = Debouncer(searchValue, 500);
  const MobileTableData = data?.map((data) => ({
    id: data.id,
    name: data.name,
    timestamp: data.timestamp,
    amount: data.amount,
  }));
  const table = useReactTable({
    data: data || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  function HandleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
  }

  React.useEffect(() => {
    table.getColumn("name")?.setFilterValue(debouncedValue);
  }, [debouncedValue, table]);

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
