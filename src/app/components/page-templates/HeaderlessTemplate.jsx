import React from 'react';
import EmptyHeader from '../organisms/EmptyHeader';
import Footer from '../organisms/Footer';

function HeaderlessTemplate(props) {


  return (
    <>
      <div className="the-bg"></div>
      <EmptyHeader />
      <main>
        <div className="default-container">
          {props.children}
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
}


export default HeaderlessTemplate;
