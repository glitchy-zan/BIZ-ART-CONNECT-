import React from "react";
import { Link } from "react-router-dom";
import style from "../customStyle/LandingPageStyle.module.css";
import LandingPageNavigation from "../customComponents/LandingPageNavigation";

class LandingPage extends React.Component {
  // constructor and state...

  render() {
    return (
      <>
        <LandingPageNavigation />
        <div className={`${style.contentSpacer} ${style.landingContent}`}>
          <h1>Welcome to Biz-Art Connect</h1>
          <p>
            Biz-Art Connect is a unique platform where artists and businesses
            converge to create, collaborate, and celebrate the fusion of art and
            commerce. We provide a dedicated space for artists to showcase their
            work and for businesses to discover and commission bespoke pieces
            that resonate with their brand's ethos. Whether you're an artist
            looking to expand your reach or a business seeking to inject
            creativity into your space, Biz-Art Connect is the bridge to your
            next masterpiece.
          </p>
        </div>
      </>
    );
  }
}

export default LandingPage;
