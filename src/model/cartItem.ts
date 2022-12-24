import { I_Items } from './items';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface I_CartItem {
  id: string;
  items: I_Items;
  count: number;
}
