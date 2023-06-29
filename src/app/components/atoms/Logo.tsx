import React from "react";
import { Link } from "react-router-dom";

function Logo(): React.JSX.Element {
  return (
    <Link to="/" className="logo-wrapper">
      <img src="./assets/tableland-logo.svg" className="navbar--logo" />
      <span className="navbar--logo_text">
        Tableland <span>Console</span>
      </span>
    </Link>
  );
}

export default Logo;
