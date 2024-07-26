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
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SearchInput from "../Input/SearchInput";
import TableComponent from "./CustomTableComponent";
import { columns } from "./columns.data";
import Debouncer from "@/helpers/debouncer";
import { useQuery } from "@tanstack/react-query";
import { fetchAll } from "@/services/expense/fetch";

export type Transaction = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  name: string;
  timestamp: number | string;
};

export default function MainTable() {
  const { isPending, error, data } = useQuery({
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

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <div className="inline-flex w-full justify-between items-center">
          <h1 className="text-xl font-semibold">Expenses</h1>
          <div className="filters inline-flex gap-2 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Filter <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
            <SearchInput
              placeholder="Search by Name, Catogery and etc."
              value={searchValue}
              onChange={HandleSearch}
              className="max-w-sm"
            />
          </div>
        </div>
      </div>
      <div className="rounded-md border">
        <TableComponent isPending={isPending} columns={columns} table={table} />
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
