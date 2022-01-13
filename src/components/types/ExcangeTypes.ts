export type CurrencyType = "GBP" | "EUR" | "USD";

export type CurrencyObject = {
  mount: number;
  name: CurrencyType;
  symbol: string;
};
