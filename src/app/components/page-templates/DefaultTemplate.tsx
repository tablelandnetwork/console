import React from "react";
import Footer from "../atoms/Footer";
import Header from "../organisms/Header";

function DefaultTemplate(props: any): React.JSX.Element {
  return (
    <>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </>
  );
}

export default DefaultTemplate;
