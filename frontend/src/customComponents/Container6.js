import React from "react";
import containerStyle from "../customStyle/ContainerStyle.module.css";

const Container6 = ({ children, onClick }) => {
  return (
    <div className={containerStyle.Container6} onClick={onClick}>
      {children}
    </div>
  );
};

export default Container6;