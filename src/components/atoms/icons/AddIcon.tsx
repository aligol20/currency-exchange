import { IoAddOutline } from "react-icons/io5";
import React from "react";

const AddIcon: React.FC<{ props?: any; size?: number }> = ({ props, size }) => {
  return <IoAddOutline size={size} {...props} />;
};
export default AddIcon;
