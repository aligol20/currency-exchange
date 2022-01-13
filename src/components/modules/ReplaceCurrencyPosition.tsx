import React from "react";
import styled from "styled-components";
import TransferIcon from "../atoms/icons/TransferIcon";

const ReplaceCurrencyPosition: React.FC<{ onCLick?: () => void }> = ({
  onCLick,
}) => {
  return (
    <Maintainer onClick={onCLick}>
      <TransferIcon size={31} color={"grey"} />
    </Maintainer>
  );
};
export default ReplaceCurrencyPosition;

const Maintainer = styled.div`
  display: flex;
  border-width: 0.1rem;
  border-radius: 4rem;
  border-style: solid;
  border-color: rgb(156, 201, 151);
  height: 3rem;
  position: absolute;
  right: 11rem;
  margin-bottom: 2.5rem;
  background-color: white;
  z-index: 1;
  align-items: center;
  justify-content: center;
  width: 3rem;
`;
