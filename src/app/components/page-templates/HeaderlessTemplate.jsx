import React from 'react';
import EmptyHeader from '../organisms/EmptyHeader';

function HeaderlessTemplate(props) {

  return (
    <>
      <div className="the-bg"></div>
      <EmptyHeader />
      <main>
          {props.children}
      </main>
    </>
  );
}

export default HeaderlessTemplate;
