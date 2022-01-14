import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../../App.css";
import AppInput from "../atoms/AppInput";
import AppText from "../atoms/AppText";
import AddIcon from "../atoms/icons/AddIcon";
import NegativeIcon from "../atoms/icons/NegativeIcon";
import { CurrencyObject, CurrencyType } from "../types/ExcangeTypes";
import usePrevious from "../utils/hooks/usePrevious";
let temp;
const CurrencyRowItem: React.FC<{
  currencies: CurrencyObject[];
  onExchangeMountInput: (e: string) => void;
  exchangeMount?: number;
  selectedCurrency: CurrencyType;
  setSelectedCurrency: (item: CurrencyType) => void;
  exceedWallet?: boolean | undefined;
  isUp?: boolean;
}> = ({
  currencies,
  onExchangeMountInput,
  setSelectedCurrency,
  selectedCurrency,
  exchangeMount,
  exceedWallet,
  isUp,
}) => {
  const foundCurrency = (e: string): CurrencyObject | undefined =>
    currencies.find((item) => item.name === e);
  const [changed, setChanged] = useState<"none" | "dec" | "inc">("none");
  const prevCount: number | undefined = usePrevious(
    foundCurrency(selectedCurrency)?.mount
  );
  useEffect(() => {
    if (prevCount && Number(foundCurrency(selectedCurrency)?.mount)) {
      if (prevCount > Number(foundCurrency(selectedCurrency)?.mount)) {
        setChanged("dec");
      }
      if (prevCount < Number(foundCurrency(selectedCurrency)?.mount)) {
        setChanged("inc");
      }
    }
  }, [foundCurrency(selectedCurrency)?.mount]);
  useEffect(() => {
    if (changed === "dec" || changed === "inc") {
      setTimeout(() => {
        setChanged("none");
      }, 500);
    }
  }, [changed]);

  return (
    <Container isUp={isUp}>
      <WalletInfo>
        <Select
          onChange={(e) => {
            if (e.target.value) {
              const symbol = e.target.value || "";
              const cur: CurrencyType | undefined = foundCurrency(symbol)?.name;

              if (cur) {
                setSelectedCurrency(cur);
              }
            }
          }}
          value={selectedCurrency}
          name="cars"
          id="cars"
        >
          {currencies.map((item, index) => (
            <Option key={index} value={item.name}>
              {item.name}
            </Option>
          ))}
        </Select>
        {prevCount && (
          <BalanceText
            isChanged={changed}
            style={{
              ...{ paddingTop: "0.5rem" },
              // ...transitionStyles[isUp ? "source" : "sink"][state],
            }}
          >
            {`Balance:${foundCurrency(selectedCurrency)?.symbol}${foundCurrency(
              selectedCurrency
            )?.mount.toFixed(4)}`}
          </BalanceText>
        )}
      </WalletInfo>
      <InputSide>
        <AppInput
          value={exchangeMount !== 0 ? exchangeMount?.toString() : ""}
          onChange={(e) => {
            if (+e.target.value || e.target.value === "") {
              onExchangeMountInput(e.target.value);
            }
          }}
          leftComponent={
            isUp ? <NegativeIcon size={23} /> : <AddIcon size={23} />
          }
        />
        <AppText
          style={{
            color: exceedWallet && isUp ? "red" : "#ffffff",
            marginTop: "1rem",
          }}
        >
          {"Exceeds balance"}
        </AppText>
      </InputSide>
    </Container>
  );
};
export default CurrencyRowItem;

interface ContainerProps {
  isUp?: boolean;
}
interface BalanceText {
  isChanged?: "none" | "dec" | "inc";
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${(p: { isUp?: boolean }) =>
    p.isUp ? "rgb(255,255,255)" : "rgb(247,247,247)"};
  height: 7rem;
  padding: 1rem;
  border-radius: ${(p: { isUp?: boolean }) =>
    p.isUp ? `0.3rem 0.3rem 0 0` : `0 0 0.3rem 0.3rem`};
`;
const InputSide = styled.div``;
const WalletInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const Option = styled.option`
  background-color: white;
  option {
    color: black;
    font-weight: small;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;
const Select = styled.select`
  background-color: white;
  border-radius: 0.2rem;
  border-width: 0.05rem;
  border-color: black;
  border-style: solid;
  min-width: 3.5rem;
  align-self: flex-start;
`;
const BalanceText = styled(AppText)<BalanceText>`
  color: ${(p: { isChanged?: "none" | "dec" | "inc" }) =>
    p.isChanged === "none" ? "black" : p.isChanged === "inc" ? "green" : "red"};

  transition: color 0.5s;
`;
