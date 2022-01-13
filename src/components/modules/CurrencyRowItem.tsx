import React, { useState } from "react";
import { CurrencyType, currencyType } from "../../App";
import styled from "styled-components";
import AppText from "../atoms/AppText";
import AppInput from "../atoms/AppInput";
import AddIcon from "../atoms/icons/AddIcon";
import NegativeIcon from "../atoms/icons/NegativeIcon";

const CurrencyRowItem: React.FC<{
  currencies: currencyType[];
  onExchangeMountInput: (e: string) => void;
  exchangeMount?: number;
  selectedCurrency?: CurrencyType;
  setSelectedCurrency: (item: CurrencyType) => void;
  exceedWallet?: boolean | undefined;
  isSource?: boolean;
}> = ({
  currencies,
  onExchangeMountInput,
  setSelectedCurrency,
  selectedCurrency,
  exchangeMount,
  exceedWallet,
  isSource,
}) => {
  const foundCurrency = (e: string) =>
    currencies.find((item) => item.name === e);
  return (
    <Container isSource={isSource}>
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
          name="cars"
          id="cars"
        >
          {currencies.map((item, index) => (
            <Option key={index} value={item.name}>
              {item.name}
            </Option>
          ))}
        </Select>
        {selectedCurrency && (
          <AppText
            style={{ paddingTop: "0.5rem" }}
            title={`Balance:${foundCurrency(selectedCurrency)?.symbol}${
              foundCurrency(selectedCurrency)?.mount
            }`}
          />
        )}
      </WalletInfo>
      <InputSide>
        <AppInput
          type={"number"}
          value={exchangeMount !== 0 ? exchangeMount?.toString() : ""}
          onChange={(e) => {
            onExchangeMountInput(e.target.value);
          }}
          leftComponent={isSource ? <AddIcon /> : <NegativeIcon />}
        />
        {exceedWallet && <div>exceed your wallet</div>}
      </InputSide>
    </Container>
  );
};
export default CurrencyRowItem;

interface ContainerProps {
  isSource: boolean | undefined;
}
const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${(p: { isSource?: boolean }) =>
    p.isSource ? "rgb(255,255,255)" : "rgb(247,247,247)"};
  height: 7rem;
  padding: 1rem;
`;
const InputSide = styled.div``;
const WalletInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const Option = styled.option`
  background-color: white;
  border-color: red;
  option {
    color: black;
    background: red;
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
