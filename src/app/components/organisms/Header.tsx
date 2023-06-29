import React from "react";
import Logo from "../atoms/Logo";
import NavBar from "../molecules/Menu_Navbar";

function Header(props: any): React.JSX.Element {
  return (
    <header className={`navbar ${props.className as string}`}>
      <Logo />
      <NavBar />
    </header>
  );
}
export default Header;
