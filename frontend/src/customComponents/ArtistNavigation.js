import React from "react";
import { Link } from "react-router-dom";
import style from "../customStyle/LandingPageStyle.module.css";

class ArtistNavigation extends React.Component {
  // constructor and state...

  render() {
    return (
      <>
        <nav>
          <ul className={style.navigation}>
            <li>
              <Link to="/artist/dashboard" className={`${style.itemsLeft} ${style.itemLink}`}>
                ARTIST
              </Link>
            </li>
            <li>
              <Link
                to="/artist/dashboard"
                className={`${style.itemsRight} ${style.itemLink}`}
              >
                DASHBOARD
              </Link>
            </li>
            <li>
              <Link
                to="/artist/trending"
                className={`${style.itemsRight} ${style.itemLink}`}
              >
                TRENDING
              </Link>
            </li>
            <li>
              <Link to="/artist/foryou" className={`${style.itemsRight} ${style.itemLink}`}>
                FOR YOU
              </Link>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}

export default ArtistNavigation;
