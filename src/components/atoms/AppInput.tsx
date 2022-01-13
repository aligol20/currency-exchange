import React, { ChangeEventHandler, HTMLInputTypeAttribute } from "react";
import styled from "styled-components";
import AddIcon from "./icons/AddIcon";

const AppInput: React.FC<{
  style?: React.CSSProperties;
  value?: string;
  onChange?: ChangeEventHandler<any> | undefined;
  props?: any;
  type?: HTMLInputTypeAttribute | undefined;
  leftComponent?: React.ReactElement;
}> = ({ value, onChange, props, type, leftComponent }) => {
  return (
    <Container>
      {leftComponent}
      <Input type={type} value={value} onChange={onChange} {...props} />
    </Container>
  );
};
export default AppInput;

const Input = styled.input`
  border: none;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  align-self: flex-start;
  min-width: 4rem;
  max-width: 10rem;
  width: 2rem;
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
`;
