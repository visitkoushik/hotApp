// eslint-disable-next-line @typescript-eslint/naming-convention
export interface I_Category {
  categoryName: string;
  id: string;
  categoryDiscount: number;
  discountInPercent: boolean;
  available?: boolean;
}
