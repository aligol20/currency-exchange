import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import CurrencyRowItem from "./components/modules/CurrencyRowItem";
import axios from "axios";

export type CurrencyType = "GBP" | "EUR" | "USD";

export type currencyType = {
  mount: number;
  name: CurrencyType;
  symbol: string;
};
function App() {
  const initialCurrencies: currencyType[] = [
    { name: "USD", mount: 200, symbol: "$" },
    { name: "EUR", mount: 150, symbol: "€" },
    { name: "GBP", mount: 10, symbol: "£" },
  ];

  const [currencies, setCurrencis] =
    useState<currencyType[]>(initialCurrencies);
  const [sourceCurrency, setSourceCurrency] = useState<CurrencyType>("USD");
  const [sinkCurrency, setSinkCurrency] = useState<CurrencyType>("USD");
  const [exchangeMount, setExchangeMount] = useState({ mount: "", type: "" });
  const [rates, setRates] = useState({
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
  });
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
        console.log(rate, "(((((((((");
        setRates(rate);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

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

    if (a && b && a <= b) {
      return false;
    }
    return true;
  };
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

  return (
    <div className="App" style={{ display: "flex", flexDirection: "column" }}>
      <CurrencyRowItem
        currencies={currencies}
        onExchangeMountInput={(e) => {
          setExchangeMount({ type: "source", mount: e });
        }}
        exchangeMount={converter("source")}
        selectedCurrency={sourceCurrency}
        setSelectedCurrency={setSourceCurrency}
        exceedWallet={exceedWallet()}
        isSource
      />
      <CurrencyRowItem
        currencies={currencies}
        onExchangeMountInput={(e) => {
          setExchangeMount({ type: "sink", mount: e });
        }}
        exchangeMount={converter("sink")}
        selectedCurrency={sinkCurrency}
        setSelectedCurrency={setSinkCurrency}
      />
      <button
        disabled={sourceCurrency === sinkCurrency || exceedWallet()}
        onClick={exchange}
      >
        {"exchange"}
      </button>
    </div>
  );
}

export default App;
