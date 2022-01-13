import { IoAddOutline } from "react-icons/io5";
import React from "react";

const AddIcon: React.FC<{ props?: any; size?: number; color?: string }> = ({
  props,
  size,
  color,
}) => {
  return <IoAddOutline size={size} color={color} {...props} />;
};
export default AddIcon;
