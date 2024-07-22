import React, { useState } from "react";
import LandingPageNavigation from "../customComponents/LandingPageNavigation";
import style from "../customStyle/LandingPageStyle.module.css";
import formStyle from "../customStyle/FormStyle.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ArtistNavigation from "../customComponents/ArtistNavigation";
import Container1 from "../customComponents/Container1";
import Container2 from "../customComponents/Container2";

const ArtistDashboardPage = () => {
  return (
    <>
      <ArtistNavigation />
      <Container1>
        <h2>Personal info</h2>
        <p>Unavailable.</p>
      </Container1>
      <Container2>
        <h2>Portfolio</h2>
        <p>Portfolio not yet created.</p>
      </Container2>
      <Container1>
        <h2>Quick stats</h2>
        <p>Unavailable.</p>
      </Container1>
      <Container2>
        <h2>Profile settings</h2>
        <p>Unavailable.</p>
      </Container2>
    </>
  );
};

export default ArtistDashboardPage;
