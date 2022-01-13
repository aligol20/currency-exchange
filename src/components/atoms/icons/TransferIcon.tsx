import { CgArrowsExchangeAltV } from "react-icons/cg";
import React from "react";

const TransferIcon: React.FC<{
  props?: any;
  size?: number;
  color?: string;
}> = ({ props, size, color }) => {
  return <CgArrowsExchangeAltV size={size} color={color} {...props} />;
};
export default TransferIcon;
