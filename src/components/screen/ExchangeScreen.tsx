import React from "react";
import styled from "styled-components";
import AppButton from "../atoms/AppButton";
import CurrencyRate from "../modules/CurrencyRate";
import CurrencyRowItem from "../modules/CurrencyRowItem";
import ReplaceCurrencyPosition from "../modules/ReplaceCurrencyPosition";
import useExchangeLogic from "./ExchangeScreenLogic";

interface ContainerProps {
  isUp: boolean;
}
const ExchangeScreen: React.FC = () => {
  const {
    converter,
    exceedWallet,
    setExchangeMount,
    exchange,
    setSinkCurrency,
    setSourceCurrency,
    isSinkUp,
    symbols,
    rates,
    currencies,
    sourceCurrency,
    sinkCurrency,
    setIsSinkUp,
  } = useExchangeLogic();
  const exchangeButtonStyle = {
    backgroundColor:
      sourceCurrency === sinkCurrency || exceedWallet()
        ? "grey"
        : "rgb(213,56,99)",
    color: "white",
    padding: "0.5rem",
    margin: "0.5rem 0.5rem 0 0",
    borderRadius: "0.1rem",
    alignSelf: "flex-start",
  };

  const reOrderSinkWithSource = () => {
    setIsSinkUp(!isSinkUp);
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
        exceedWallet={exceedWallet()}
        isSource={isSinkUp}
        isUp
      />
      <ReplaceCurrencyPosition onCLick={reOrderSinkWithSource} />

      <Maintainer>
        <CurrencyRate
          source={{ rate: 1, symbol: symbols[sourceCurrency] }}
          sink={{
            rate: rates[sourceCurrency][sinkCurrency],
            symbol: symbols[sinkCurrency],
          }}
        />
      </Maintainer>

      <CurrencyRowItem
        currencies={currencies}
        onExchangeMountInput={(e) => {
          setExchangeMount({ type: "sink", mount: e });
        }}
        exchangeMount={converter("sink")}
        selectedCurrency={sinkCurrency}
        setSelectedCurrency={setSinkCurrency}
        isSource={!isSinkUp}
      />

      <AppButton
        style={exchangeButtonStyle}
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
const Maintainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
