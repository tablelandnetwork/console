import React from 'react';
import { Link } from 'react-router-dom';
import DefaultTemplate from '../page-templates/DefaultTemplate';

function AboutPage(props) {

  return (
    <DefaultTemplate>
      <div className='about'>
        <p>Tableland is an amazing thing</p>
        <Link to="/">Home</Link>
      </div>

    </DefaultTemplate>
  );
}
export default AboutPage;
