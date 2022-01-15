import { type } from "os";

export type CurrencyType = "GBP" | "EUR" | "USD";

export type CurrencyProps = {
  mount: number;
  symbol: string;
};
export type CurrencyObject = {
  GBP: CurrencyProps;
  EUR: CurrencyProps;
  USD: CurrencyProps;
};
