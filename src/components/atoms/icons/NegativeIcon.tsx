import { IoRemoveOutline } from "react-icons/io5";
import React from "react";

const NegativeIcon: React.FC<{
  props?: any;
  size?: number;
  color?: string;
}> = ({ props, size, color }) => {
  return <IoRemoveOutline {...props} size={size} color={color} />;
};
export default NegativeIcon;
