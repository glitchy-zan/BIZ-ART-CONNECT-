import React from "react";
import style from "../customStyle/FooterStyle.module.css"; // Import the CSS file for styling

class Footer extends React.Component {
  render() {
    return (
      <footer className={style.footer}>
        <p>© Source code available on <a href="https://github.com/glitchy-zan/BIZ-ART-CONNECT" style={{ color: 'gray' }}>
    https://github.com/glitchy-zan/BIZ-ART-CONNECT
  </a>.  All rights reserved.</p>
      </footer>
    );
  }
}

export default Footer;
