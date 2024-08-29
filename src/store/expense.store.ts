import { TableDataResultProps } from "@/types/types/types.main";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ExpenseState {
  expenses: TableDataResultProps[] | null;
  loading: boolean;
  setExpenses: (expenses: TableDataResultProps[] | null) => void;
  updateExpenses: (updates: Partial<TableDataResultProps>) => void;
  getExpenses: () => TableDataResultProps | null;
  clearExpenses: () => void;
  setLoading: (loading: boolean) => void;
}

const useExpenseStore = create(
  persist(
    (set) => ({
      expenses: null,
      loading: true,
      setLoading: (loading: ExpenseState["loading"]) =>
        set({ loading: loading }),
      setExpenses: (expenses: TableDataResultProps[]) => set({ expenses }),
      updateExpenses: (updates: TableDataResultProps) =>
        set((state: ExpenseState) => ({
          expense: { ...state.expenses, ...updates },
        })),
      getExpenses: () => set((state: ExpenseState) => state.expenses),
      clearExpenses: () => set({ expenses: null }),
    }),
    {
      name: "expense-storage",
      storage: {
        getItem: (key) => {
          const storedValue = localStorage.getItem(key);
          return storedValue ? JSON.parse(storedValue) : null;
        },
        setItem: (key, value) => {
          localStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: (key) => {
          localStorage.removeItem(key);
        },
      },
    }
  )
);

export default useExpenseStore;
