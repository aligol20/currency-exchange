import axios from "axios";
import { useEffect, useState } from "react";
import { CurrencyObject, CurrencyType } from "../types/ExcangeTypes";

const symbols = {
  USD: "$",
  EUR: "€",
  GBP: "£",
};
const initialCurrencies: CurrencyObject[] = [
  { name: "USD", mount: 200, symbol: symbols["USD"] },
  { name: "EUR", mount: 150, symbol: symbols["EUR"] },
  { name: "GBP", mount: 10, symbol: symbols["GBP"] },
];
const initialRates = {
  USD: {
    EUR: 1.5,
    GBP: 1.2,
    USD: 1,
  },
  EUR: {
    USD: 1.1,
    GBP: 1.2,
    EUR: 1,
  },
  GBP: {
    USD: 1.2,
    EUR: 1.3,
    GBP: 1,
  },
};
const useExchangeLogic = () => {
  const [currencies, setCurrencis] =
    useState<CurrencyObject[]>(initialCurrencies);
  const [sourceCurrency, setSourceCurrency] = useState<CurrencyType>("USD");
  const [sinkCurrency, setSinkCurrency] = useState<CurrencyType>("USD");
  const [exchangeMount, setExchangeMount] = useState({ mount: "", type: "" });
  const [rates, setRates] = useState(initialRates);
  const [isSinkUp, setIsSinkUp] = useState<boolean>(true);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://api.exchangeratesapi.io/v1/latest?access_key=cda8eccbd3c110b804330bce69e00dfe&symbols=USD,GBP",
    })
      .then((res) => {
        let rate = {
          EUR: {
            USD: res?.data?.rates.USD,
            GBP: res?.data?.rates.GBP,
            EUR: 1,
          },
          USD: {
            EUR: 1 / res?.data?.rates.USD,
            GBP: (res?.data?.rates.GBP * 1) / res?.data?.rates.USD,
            USD: 1,
          },
          GBP: {
            EUR: 1 / res?.data?.rates.GBP,
            USD: (res?.data?.rates.USD * 1) / res?.data?.rates.GBP,
            GBP: 1,
          },
        };
        setRates(rate);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const exchange = () => {
    const source = currencies.find((item) => sourceCurrency === item.name);
    const sink = currencies.find((item) => sinkCurrency === item.name);
    const calculator = converter("source");
    const calculator_ = converter("sink");
    if (source && sink && calculator && calculator_) {
      setCurrencis(
        currencies.map((x) => {
          if (x.name === sourceCurrency) {
            const r = {
              ...source,
              mount: source.mount - calculator,
            };
            return r;
          }
          if (x.name === sinkCurrency) {
            const r = {
              ...sink,
              mount: sink.mount + calculator_,
            };
            return r;
          }
          return x;
        })
      );
    }
  };
  const currencyConverter = (
    inputMount: number,
    inputType?: string,
    outputType?: string
  ) => {
    if (inputType === outputType) {
      return inputMount;
    }
    return inputMount * rates[sourceCurrency][sinkCurrency];
  };

  const converter = (type: string) => {
    if (exchangeMount.type === type) {
      return +exchangeMount.mount;
    }
    if (exchangeMount.type !== type) {
      return currencyConverter(
        +exchangeMount.mount,
        sourceCurrency,
        sinkCurrency
      );
    }
  };
  const exceedWallet = () => {
    const a = converter("source");
    const b = currencies.find((x) => sourceCurrency === x.name)?.mount;
    console.log(a, "a");
    console.log(b, "b");
    if (a !== undefined && b !== undefined && a <= b) {
      return false;
    }
    return true;
  };

  return {
    currencies,
    sourceCurrency,
    sinkCurrency,
    exchangeMount,
    rates,
    symbols,
    isSinkUp,
    exchange,
    currencyConverter,
    converter,
    exceedWallet,
    setSourceCurrency,
    setSinkCurrency,
    setExchangeMount,
    setIsSinkUp,
  };
};
export default useExchangeLogic;
