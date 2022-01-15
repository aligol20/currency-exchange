import axios from "axios";
import { useEffect, useState } from "react";
import { CurrencyObject, CurrencyType } from "../types/ExcangeTypes";

const symbols = {
  USD: "$",
  EUR: "€",
  GBP: "£",
};
const initialCurrencies: CurrencyObject = {
  USD: { mount: 200, symbol: symbols["USD"] },
  EUR: { mount: 150, symbol: symbols["EUR"] },
  GBP: { mount: 10, symbol: symbols["GBP"] },
};
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
    useState<CurrencyObject>(initialCurrencies);
  const [sourceCurrency, setSourceCurrency] = useState<CurrencyType>("USD");
  const [sinkCurrency, setSinkCurrency] = useState<CurrencyType>("USD");
  const [exchangeMount, setExchangeMount] = useState({ mount: "", type: "" });
  const [rates, setRates] = useState(initialRates);

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
    const source = currencies[sourceCurrency];
    const sink = currencies[sinkCurrency];
    const calculator = converter("source");
    const calculator_ = converter("sink");
    if (source && sink && calculator && calculator_) {
      const temp = {
        ...currencies,
        ...{
          [sourceCurrency]: { ...source, mount: source.mount - calculator },
        },
        ...{ [sinkCurrency]: { ...sink, mount: sink.mount + calculator_ } },
      };

      setCurrencis(temp);
    }
  };
  const currencyCalculator = (
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
      return currencyCalculator(
        +exchangeMount.mount,
        sourceCurrency,
        sinkCurrency
      );
    }
  };
  const isExceedsWallet = () => {
    const neededCurrency = converter("source");
    const walletMount = currencies[sourceCurrency].mount;

    if (
      neededCurrency !== undefined &&
      walletMount !== undefined &&
      neededCurrency <= walletMount
    ) {
      return false;
    }
    return true;
  };
  const replaceSinkWithSource = () => {
    const sink = sinkCurrency;
    const source = sourceCurrency;
    setSinkCurrency(source);
    setSourceCurrency(sink);
  };

  const isEchangeDisable = (): boolean => {
    if (sourceCurrency === sinkCurrency) return true;
    if (isExceedsWallet()) return true;
    if (exchangeMount.mount === "") return true;

    return false;
  };

  return {
    currencies,
    sourceCurrency,
    sinkCurrency,
    exchangeMount,
    rates,
    symbols,
    exchange,
    currencyCalculator,
    converter,
    isExceedsWallet,
    setSourceCurrency,
    setSinkCurrency,
    setExchangeMount,
    replaceSinkWithSource,
    isEchangeDisable,
  };
};
export default useExchangeLogic;
