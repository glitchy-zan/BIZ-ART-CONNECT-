import React from "react";
import containerStyle from "../customStyle/ContainerStyle.module.css";

const Container7 = ({ children, onClick }) => {
  return (
    <div className={containerStyle.Container7} onClick={onClick}>
      {children}
    </div>
  );
};

export default Container7;
