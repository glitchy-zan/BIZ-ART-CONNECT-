// src/RoundedBox.js
import React from "react";
import containerStyle from "../customStyle/ContainerStyle.module.css";

const Container2 = ({ children, onClick }) => {
  return (
    <div className={containerStyle.Container2} onClick={onClick}>
      {children}
    </div>
  );
};

export default Container2;
