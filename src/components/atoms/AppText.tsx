import React from "react";
import styled from "styled-components";

const AppText: React.FC<{
  style?: React.CSSProperties;
  props?: any;
  className?: string;
}> = ({ style, props, children, className }) => {
  return (
    <Text className={className} style={style} {...props}>
      {children}
    </Text>
  );
};
export default AppText;

const Text = styled.div``;
