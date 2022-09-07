// eslint-disable-next-line @typescript-eslint/naming-convention
export interface I_Items {
  itemName: string;
  itemId: string;
  itemPurchaseValue: number;
  itemSellValue: number;
  itemSellDiscount: number;
  discountInPercent: boolean;
  isAvailable?: boolean;
}
