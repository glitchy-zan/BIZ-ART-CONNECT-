import React from "react";
import containerStyle from "../customStyle/ContainerStyle.module.css";

const Container4 = ({ children, onClick }) => {
  return (
    <div className={containerStyle.Container4} onClick={onClick}>
      {children}
    </div>
  );
};

export default Container4;