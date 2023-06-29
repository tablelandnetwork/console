import React from "react";
import Logo from "../atoms/Logo";

function EmptyHeader(): React.JSX.Element {
  return (
    <header className="navbar">
      <Logo />
      <ul className="navbar--menu">
        <li>
          <a href="#">
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </a>
        </li>
        <li>
          <a target="_blank" href="https://dash.tableland.xyz">
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </li>
      </ul>
    </header>
  );
}
export default EmptyHeader;
