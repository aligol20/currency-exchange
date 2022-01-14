import React from "react";
import styled from "styled-components";
import AppButton from "../atoms/AppButton";
import CurrencyRate from "../modules/CurrencyRate";
import CurrencyRowItem from "../modules/CurrencyRowItem";
import ReplaceCurrencyPosition from "../modules/ReplaceCurrencyPosition";
import useExchangeLogic from "./ExchangeScreenLogic";

const ExchangeScreen: React.FC = () => {
  const {
    converter,
    isExceedsWallet,
    setExchangeMount,
    exchange,
    setSinkCurrency,
    setSourceCurrency,
    isEchangeDisable,
    replaceSinkWithSource,
    symbols,
    rates,
    currencies,
    sourceCurrency,
    sinkCurrency,
  } = useExchangeLogic();
  const exchangeButtonStyle = {
    backgroundColor: isEchangeDisable() ? "grey" : "rgb(213,56,99)",
    color: "white",
    padding: "0.5rem",
    margin: "0.5rem 0.5rem 0 0rem",
    borderRadius: "0.1rem",
    alignSelf: "flex-start",
  };

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
        exceedWallet={isExceedsWallet()}
        isUp
      />

      <ReplaceCurrencyPosition onCLick={replaceSinkWithSource} />

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
        exceedWallet={isExceedsWallet()}
        exchangeMount={converter("sink")}
        selectedCurrency={sinkCurrency}
        setSelectedCurrency={setSinkCurrency}
      />
      <AppButton
        style={exchangeButtonStyle}
        disabled={isEchangeDisable()}
        onClick={exchange}
      >
        {"Exchange"}
      </AppButton>
    </Container>
  );
};

export default ExchangeScreen;

interface ContainerProps {
  isSinkUp?: boolean;
}
const Container = styled.div<ContainerProps>`
  display: flex;
  flex: 1;
  height: 70vh;
  flex-direction: ${(p: { isSinkUp?: boolean }) =>
    p.isSinkUp ? "column" : "column"};
  background-color: rgb(40, 44, 50);
  justify-content: center;
  overflow-y: hidden;
  overflow-x: hidden;
  scroll-behavior: unset;
  padding: 10rem;
`;
