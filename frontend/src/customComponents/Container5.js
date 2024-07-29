import React from "react";
import containerStyle from "../customStyle/ContainerStyle.module.css";

const Container5 = ({ children, onClick }) => {
  return (
    <div className={containerStyle.Container5} onClick={onClick}>
      {children}
    </div>
  );
};

export default Container5;