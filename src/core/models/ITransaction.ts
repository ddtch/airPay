export interface ITransaction {
  category: string;
  vendor: string;
  amount_paid_usd: string;
  swap_price_impact: string;
  fees: string;
  id: number;
  title: string;
  amount: number;
  time: string;
  currency: string;
  icon?: any;
}
