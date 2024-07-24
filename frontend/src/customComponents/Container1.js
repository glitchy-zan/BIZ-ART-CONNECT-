// src/RoundedBox.js
import React from "react";
import containerStyle from "../customStyle/ContainerStyle.module.css";

const Container1 = ({ children, onClick }) => {
  return (
    <div className={containerStyle.Container1} onClick={onClick}>
      {children}
    </div>
  );
};

export default Container1;
