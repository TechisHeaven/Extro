export type Transaction = {
  id?: string;
  amount: number;
  status?: "pending" | "processing" | "success" | "failed";
  name: string;
  timestamp: number | string;
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
