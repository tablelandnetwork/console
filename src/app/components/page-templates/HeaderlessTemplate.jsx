import React from 'react';
import EmptyHeader from '../organisms/EmptyHeader';

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
    </>
  );
}

export default HeaderlessTemplate;
