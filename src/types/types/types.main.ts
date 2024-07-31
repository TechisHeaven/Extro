export type Transaction = {
  id?: string;
  amount: number;
  status?: "pending" | "processing" | "success" | "failed";
  name: string;
  timestamp: number | string;
  category: CategoryTypes;
};

type CategoryTypes = "snacks" | "groceries";
