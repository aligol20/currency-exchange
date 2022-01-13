import React from "react";
import styled from "styled-components";
import AppText from "../atoms/AppText";

const CurrencyRate: React.FC<{
  sink: { symbol: string; rate: number };
  source: { symbol: string; rate: number };
}> = ({ sink, source }) => {
  return (
    <Container>
      <Maintainer>
        <AppText style={{ color: "rgb(40,44,55)" }}>{` ${source.symbol}${
          source.rate
        } = ${sink.symbol}${sink.rate.toFixed(4)} `}</AppText>
      </Maintainer>
    </Container>
  );
};
export default CurrencyRate;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Maintainer = styled.div`
  display: flex;
  border-width: 0.1rem;
  border-radius: 4rem;
  border-style: solid;
  border-color: rgb(156, 201, 151);
  height: 2rem;
  position: absolute;
  background-color: white;
  z-index: 1;
  padding: 0.1rem 0.5rem 0.1rem 0.5rem;
  align-items: center;
`;
