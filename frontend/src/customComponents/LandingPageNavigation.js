import React from "react";
import { Link } from "react-router-dom";
import style from "../customStyle/LandingPageStyle.module.css";

class LandingPageNavigation extends React.Component {
  // constructor and state...

  render() {
    return (
      <>
        <nav>
          <ul className={style.navigation}>
            <li>
              <Link to="/" className={`${style.itemsLeft} ${style.itemLink}`}>
                BIZ-ART CONNECT
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className={`${style.itemsRight} ${style.itemLink}`}
              >
                REGISTER
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className={`${style.itemsRight} ${style.itemLink}`}
              >
                LOGIN
              </Link>
            </li>
            <li>
              <Link to="/" className={`${style.itemsRight} ${style.itemLink}`}>
                HOME
              </Link>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}

export default LandingPageNavigation;
