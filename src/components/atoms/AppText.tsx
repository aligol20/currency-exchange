import React from "react";
import styled from "styled-components";

const AppText: React.FC<{
  style?: React.CSSProperties;
  props?: any;
  title?: string;
}> = ({ style, props, title, children }) => {
  return (
    <Text style={style} {...props}>
      {children && children}
      {title && title}
    </Text>
  );
};
export default AppText;

const Text = styled.div`
  color: rgb(181, 181, 181);
`;
