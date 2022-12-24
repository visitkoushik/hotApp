import { I_Category } from './category';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface I_Items {
  category: string | I_Category;
  itemName: string;
  id: string;
  itemPrice: { priceAmount: number; sellingAmount: number };

  discount: number;
  isDiscountInPercentage: boolean;
  available: boolean;
}
