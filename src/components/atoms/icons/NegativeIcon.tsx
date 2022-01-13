import { IoRemoveOutline } from "react-icons/io5";
import React from "react";

const NegativeIcon: React.FC<{ props?: any; size?: number }> = ({
  props,
  size,
}) => {
  return <IoRemoveOutline {...props} size={size} />;
};
export default NegativeIcon;
