import React from "react";
import styled from "styled-components";
import AppButton from "../atoms/AppButton";
import CurrencyRate from "../modules/CurrencyRate";
import CurrencyRowItem from "../modules/CurrencyRowItem";
import useExchangeLogic from "./ExchangeScreenLogic";

const ExchangeScreen: React.FC = () => {
  const {
    converter,
    exceedWallet,
    setExchangeMount,
    exchange,
    setSinkCurrency,
    setSourceCurrency,
    symbols,
    rates,
    currencies,
    sourceCurrency,
    sinkCurrency,
  } = useExchangeLogic();

  return (
    <Container>
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
      <CurrencyRate
        source={{ rate: 1, symbol: symbols[sourceCurrency] }}
        sink={{
          rate: rates[sourceCurrency][sinkCurrency],
          symbol: symbols[sinkCurrency],
        }}
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

      <AppButton
        style={{
          backgroundColor: "rgb(213,56,99)",
          color: "white",
          padding: "0.5rem",
          margin: "0.5rem 0.5rem 0 0",
          borderRadius: "0.1rem",
          alignSelf: "flex-start",
        }}
        disabled={sourceCurrency === sinkCurrency || exceedWallet()}
        onClick={exchange}
      >
        {"Exchange"}
      </AppButton>
    </Container>
  );
};

export default ExchangeScreen;

const Container = styled.div`
  display: flex;
  flex: 1;
  height: 70vh;
  flex-direction: column;
  background-color: rgb(40, 44, 50);
  padding: 10rem;
  justify-content: center;
  overflow-y: hidden;
  overflow-x: hidden;
  scroll-behavior: unset;
`;
