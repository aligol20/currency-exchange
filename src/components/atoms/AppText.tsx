import React from "react";
import styled from "styled-components";

const AppText: React.FC<{
  style?: React.CSSProperties;
  props?: any;
  title?: string;
}> = ({ style, props, title }) => {
  return (
    <Text style={style} {...props}>
      {props && props.children && props.children}
      {title && title}
    </Text>
  );
};
export default AppText;

const Text = styled.div`
  color: rgb(181, 181, 181);
`;
