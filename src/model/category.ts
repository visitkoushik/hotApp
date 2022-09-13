// eslint-disable-next-line @typescript-eslint/naming-convention
export interface I_Category {
  categoryName: string;
  categoryId: string;
  categoryDiscount: number;
  discountInPercent: boolean;
  isAvailable?: boolean;
}
