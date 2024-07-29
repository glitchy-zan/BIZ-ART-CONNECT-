import React from "react";
import containerStyle from "../customStyle/ContainerStyle.module.css";

const Container3 = ({ children, onClick }) => {
  return (
    <div className={containerStyle.Container3} onClick={onClick}>
      {children}
    </div>
  );
};

export default Container3;
