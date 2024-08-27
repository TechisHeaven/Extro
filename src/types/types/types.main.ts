export interface NotifcationType {
  id: number | string;
  title: string;
  timestamp: number;
  img?: string;
  text?: string;
}

export type TableDataResultProps = {
  id: number;
  title: string;
  price: number;
  category: Category;
  type: Type;
  images: string[];
  expenseTime: string;
  createdAt: string;
  userId: number;
};

enum Category {
  GROCERIES,
  SNACKS,
}
enum Type {
  CASH,
  CARD,
}
