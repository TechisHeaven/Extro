"use client";

import { getExpenses } from "@/actions/expense/action";
import useExpenseStore, { ExpenseState } from "@/store/expense.store";

import React, { createContext, useContext, useEffect } from "react";

const ExpenseContext = createContext<ExpenseState | undefined>(undefined);

export function ExpenseStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const expenses = useExpenseStore() as ExpenseState;

  const { setExpenses, setLoading } = expenses;

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        const expensesResult = await getExpenses();
        if (expensesResult) {
          if (expensesResult.result) {
            setExpenses(expensesResult.result);
          }
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.error("Failed to fetch user", error);
      }
    };

    fetchExpenses();
  }, [setExpenses]);

  return (
    <ExpenseContext.Provider value={expenses}>
      {children}
    </ExpenseContext.Provider>
  );
}

export const useExpenseContext = () => useContext(ExpenseContext);
