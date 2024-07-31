"use client";
import { cn } from "@/lib/utils";
import { Transaction } from "@/types/types/types.main";
import { ArrowDownUp } from "lucide-react";
import React, { useState, useEffect } from "react";

type Direction = "asc" | "desc";
interface TableProps {
  data: Transaction[];
  searchTerm: string;
}

const categoryImages = {
  groceries: "avacado.png",
  snacks: "snacks.png",
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    let tempData = data;

    // Search functionality
    if (searchTerm) {
      tempData = tempData.filter((item) =>
        Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Sort functionality
    if (sortConfig.key) {
      tempData?.sort((a, b) => {
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
  }, [data, searchTerm, sortConfig]);

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

  return (
    <div>
      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative ">
            {data.length > 0 &&
              Object.keys(data[0])
                .filter((key) => key !== "category")
                .map((key: keyof Transaction | string) => (
                  <th
                    key={key}
                    onClick={() => handleSort(key as keyof Transaction)}
                    className="p-2 px-4 bg-white border text-left block md:table-cell cursor-pointer"
                  >
                    <p className="inline-flex items-center gap-2 capitalize text-sm font-normal text-secondaryColor">
                      {key}
                      <ArrowDownUp className="w-4 text-secondaryColor" />
                    </p>
                  </th>
                ))}
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {paginatedData?.map((row, index) => (
            <tr
              key={index}
              className="bg-white md:border border-gray-300 md:border-none md:table-row"
            >
              {Object.keys(row)
                .filter((key) => key !== "category")
                .map((key) => (
                  <td
                    key={key}
                    className={cn("p-4 md:border text-left w-fit table-cell")}
                  >
                    {key === "name" &&
                    row.category &&
                    categoryImages[row.category] ? (
                      <div className="inline-flex items-center gap-2">
                        <img
                          src={categoryImages[row.category]}
                          alt={row.category}
                          className="w-6 h-6"
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
            </tr>
          ))}
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
    </div>
  );
};

export default Table;
