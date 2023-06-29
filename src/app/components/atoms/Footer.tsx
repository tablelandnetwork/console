import React from "react";

function Footer(): React.JSX.Element {
  return (
    <footer>
      <li className="footer-links">
        <a href="https://discord.gg/dc8EBEhGbg" target="_blank">
          <i className="fa-brands fa-discord"></i>
        </a>
        <a href="https://mobile.twitter.com/tableland__" target="_blank">
          <i className="fa-brands fa-twitter"></i>
        </a>
        <a href="https://github.com/tablelandnetwork/admin-ui" target="_blank">
          <i className="fa-brands fa-github"></i>
        </a>
        <a href="https://docs.tableland.xyz/" target="_blank">
          <i className="fa-solid fa-book"></i>
        </a>
      </li>
    </footer>
  );
}
export default Footer;
