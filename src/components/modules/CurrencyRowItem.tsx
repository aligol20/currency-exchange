import React, { useState } from "react";
import { CurrencyType, CurrencyObject } from "../types/ExcangeTypes";
import styled, { css, keyframes } from "styled-components";
import AppText from "../atoms/AppText";
import AppInput from "../atoms/AppInput";
import AddIcon from "../atoms/icons/AddIcon";
import NegativeIcon from "../atoms/icons/NegativeIcon";

const CurrencyRowItem: React.FC<{
  currencies: CurrencyObject[];
  onExchangeMountInput: (e: string) => void;
  exchangeMount?: number;
  selectedCurrency?: CurrencyType;
  setSelectedCurrency: (item: CurrencyType) => void;
  exceedWallet?: boolean | undefined;
  isSource?: boolean;
  isUp?: boolean;
}> = ({
  currencies,
  onExchangeMountInput,
  setSelectedCurrency,
  selectedCurrency,
  exchangeMount,
  exceedWallet,
  isSource,
  isUp,
}) => {
  const foundCurrency = (e: string) =>
    currencies.find((item) => item.name === e);
  return (
    <Container isUp={isUp} isSource={isSource}>
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
          value={
            exchangeMount !== 0 ? exchangeMount?.toFixed(4).toString() : ""
          }
          onChange={(e) => {
            if (+e.target.value || e.target.value === "") {
              onExchangeMountInput(e.target.value);
            }
          }}
          leftComponent={
            isSource ? <NegativeIcon size={23} /> : <AddIcon size={23} />
          }
        />
        <AppText
          style={{ color: exceedWallet ? "red" : "#ffffff", marginTop: "1rem" }}
        >
          {"Exceeds balance"}
        </AppText>
      </InputSide>
    </Container>
  );
};
export default CurrencyRowItem;

interface ContainerProps {
  isSource: boolean | undefined;
  isUp?: boolean;
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
