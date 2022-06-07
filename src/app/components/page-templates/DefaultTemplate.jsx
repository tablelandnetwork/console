import React from 'react';
import Footer from '../organisms/Footer';
import Header from '../organisms/Header';

function DefaultTemplate(props) {


  return (
    <>
      <div className="the-bg"></div>
      <Header />
      <main>
        <div className="default-container">
          {props.children}
        </div>
      </main>
      <Footer />
    </>
  );
}


export default DefaultTemplate;
