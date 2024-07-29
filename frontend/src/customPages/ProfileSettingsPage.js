import React, { useState, useEffect } from "react";
import LandingPageNavigation from "../customComponents/LandingPageNavigation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import ArtistNavigation from "../customComponents/ArtistNavigation";
import { Footer, FooterFix } from "../customComponents/Footer";
import ArtistContainer from "../customComponents/ArtistContainer";
import Container5 from "../customComponents/Container5";
import plusSvg from "../svg/plus.svg";
import deleteSvg from "../svg/delete.svg";
import deleteWhiteSvg from "../svg/delete_white.svg";
import imageStyle from "../customStyle/ContainerStyle.module.css";
import Masonry from "react-masonry-css";

const ProfileSettingPage = () => {
  const logOut = () => {
    // session destroy
    // log out
  };

  const deleteAccount = () => {
    // delete
  };
  return (
    <>
      <ArtistNavigation />
      <div style={{ marginTop: "80px" }}>
        <Container5 onClick={logOut}>
          <h2>Log Out</h2>
        </Container5>
        <Container5 onClick={deleteAccount}>
          <h2>Delete Account</h2>
        </Container5>
      </div>
      <FooterFix />
    </>
  );
};

export default ProfileSettingPage;
