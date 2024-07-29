import React, { useState, useEffect } from "react";
import ArtistNavigation from "../customComponents/ArtistNavigation";
import style from "../customStyle/LandingPageStyle.module.css";
import formStyle from "../customStyle/FormStyle.module.css";
import axios from "axios";
import { Circles } from "react-loader-spinner";
import Container3 from "../customComponents/Container3";
import Container4 from "../customComponents/Container4";
import { Footer, FooterFix } from "../customComponents/Footer";

const AwardPage = () => {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Circles
          height="80"
          width="80"
          color="#333"
          ariaLabel="circles-loading"
          visible={true}
        />
      </div>
    );
  }

  return (
    <>
      <ArtistNavigation />
      <h1 style={{ margin: "80px", textAlign: "center", fontSize: "50px" }}>
        AWARDS
      </h1>

      <FooterFix />
    </>
  );
};

export default AwardPage;
