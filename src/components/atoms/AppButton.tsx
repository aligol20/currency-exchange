import React, { ChangeEventHandler } from "react";
import styled from "styled-components";

const AppButton: React.FC<{
  style?: React.CSSProperties;
  onClick?: ChangeEventHandler<any> | undefined;
  disabled?: boolean;
  props?: any;
}> = ({ onClick, disabled, props, style, children }) => {
  return (
    <Button onClick={onClick} disabled={disabled} style={style} {...props}>
      {children && children}
    </Button>
  );
};
export default AppButton;

const Button = styled.button`
  border-style: solid;
  border-width: 0rem;
  :disabled {
    background-color: gray;
  }
`;
