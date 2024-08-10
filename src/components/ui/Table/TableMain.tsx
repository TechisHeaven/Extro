"use client";
import Debouncer from "@/helpers/debouncer";
import { cn } from "@/lib/utils";
import { Transaction } from "@/types/types/types.main";
import { ArrowDownUp, Info } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import { CustomDialog } from "../Dialog/CustomDialog";
import TransactionContainer from "../Transaction/TransactionContainer";

type Direction = "asc" | "desc";
interface TableProps {
  data: Transaction[];
  searchTerm: string;
}

const categoryImages = {
  groceries: "/avacado.png",
  snacks: "/snacks.png",
  // add other categories and their images
};

const Table = ({ data, searchTerm }: TableProps) => {
  const [filteredData, setFilteredData] = useState<Transaction[]>(data);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Transaction;
    direction: Direction;
  }>({
    key: "name",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction>({
    amount: 0,
    name: "",
    timestamp: 0,
    category: "groceries",
  });
  const itemsPerPage = 10;

  const debouncedSearchTerm = Debouncer(searchTerm, 500);

  //debouncer configued SearchTerm
  useEffect(() => {
    let tempData = data;

    // Search functionality
    if (debouncedSearchTerm) {
      tempData = tempData.filter((item) =>
        Object.values(item).some((value) =>
          value
            .toString()
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase())
        )
      );
    }

    // Sort functionality
    if (sortConfig.key) {
      tempData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue === undefined || aValue === null) return 1;
        if (bValue === undefined || bValue === null) return -1;

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredData(tempData);
  }, [data, debouncedSearchTerm, sortConfig]);

  // Pagination logic
  const paginatedData: Transaction[] = filteredData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key: keyof Transaction) => {
    let direction: Direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  function handleSelectTransaction(transaction: Transaction) {
    setSelectedTransaction(transaction);
    setIsDialogOpen(!isDialogOpen);
  }

  return (
    <div>
      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative ">
            {data.length > 0 &&
              (Object.keys(data[0]) as (keyof Transaction)[])
                .filter((key) => key !== "category")
                .map((key) => (
                  <th
                    key={key}
                    onClick={() => handleSort(key)}
                    className="p-2 px-4 bg-white border text-left block md:table-cell cursor-pointer"
                  >
                    <p className="inline-flex items-center gap-2 capitalize text-sm font-normal text-secondaryColor">
                      {key}
                      <ArrowDownUp className="w-4 text-secondaryColor" />
                    </p>
                  </th>
                ))}
            <th className="p-2 px-4 bg-white border text-center block md:table-cell cursor-pointer">
              <p className="inline-flex items-center gap-2 capitalize text-sm font-normal text-secondaryColor">
                Info
              </p>
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group border">
          {paginatedData.length > 0 ? (
            paginatedData?.map((row, index) => (
              <tr
                key={index}
                className="bg-white md:table-row cursor-pointer hover:bg-gray-50 transition-colors"
              >
                {/* md:border border-gray-300 md:border-none */}
                {(Object.keys(row) as (keyof Transaction)[])
                  .filter((key) => key !== "category")
                  .map((key) => (
                    <td
                      key={key}
                      className={cn("p-4 text-left w-fit table-cell")}
                    >
                      {key === "name" &&
                      row.category &&
                      categoryImages[row.category] ? (
                        <div className="inline-flex items-center gap-2">
                          <Image
                            src={categoryImages[row.category]}
                            alt={row.category}
                            className="w-6 h-6"
                            width={24}
                            height={24}
                          />
                          {row[key]}
                        </div>
                      ) : key === "amount" ? (
                        `$${row[key]}`
                      ) : (
                        row[key]
                      )}
                    </td>
                  ))}
                <td className="p-4 w-full inline-flex items-center justify-center">
                  <Info
                    className="w-4 h-4"
                    onClick={() => handleSelectTransaction(row)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="">No Result Found</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex pagination justify-end gap-2 mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className={`p-2 border rounded text-secondaryColor ${
            currentPage === 1 ? "" : "hover:text-black"
          } transition-colors`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              prev * itemsPerPage < filteredData?.length ? prev + 1 : prev
            )
          }
          className={`p-2 border rounded text-secondaryColor ${
            currentPage * itemsPerPage >= filteredData?.length
              ? ""
              : "hover:text-black"
          } transition-colors`}
          disabled={currentPage * itemsPerPage >= filteredData?.length}
        >
          Next
        </button>
      </div>
      <CustomDialog open={isDialogOpen} setIsDialogOpen={setIsDialogOpen}>
        <TransactionContainer transaction={selectedTransaction} />
      </CustomDialog>
    </div>
  );
};

export default Table;
