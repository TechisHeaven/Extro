export type Transaction = {
  id?: string;
  price: number | string;
  status?: "pending" | "processing" | "success" | "failed";
  title: string;
  expenseTime: number | string;
  createdAt?: number | string;
  category: CategoryTypes;
};

type CategoryTypes = "snacks" | "groceries";

export interface NotifcationType {
  id: number | string;
  title: string;
  timestamp: number;
  img?: string;
  text?: string;
}

export type TableDataResultProps = {
  id?: number;
  title: string;
  price: number | string;
  category: Category;
  type?: Type;
  images?: string[];
  expenseTime: string;
  createdAt?: string;
  userId?: number;
};

type CurrentExpense = {
  userId: number;
  monthExpense: number;
  weekExpense: number;
  yearExpense: number;
};

enum Category {
  GROCERIES,
  SNACKS,
}
enum Type {
  CASH,
  CARD,
}
