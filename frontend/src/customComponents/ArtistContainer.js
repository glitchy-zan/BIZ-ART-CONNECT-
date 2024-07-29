import React from "react";
import containerStyle from "../customStyle/ContainerStyle.module.css";

const ArtistContainer = ({ children, onClick }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className={containerStyle.ArtistContainer} onClick={onClick}>
        {children}
      </div>
    </div>
  );
};

export default ArtistContainer;
