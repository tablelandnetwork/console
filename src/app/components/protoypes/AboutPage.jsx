import React from 'react';
import { Link } from 'react-router-dom';
import DefaultTemplate from '../page-templates/DefaultTemplate';

function AboutPage() {

  return (
    <DefaultTemplate>
      <div className='simple-page'>
        <p>Tableland is an amazing thing</p>
        <Link to="/">Home</Link>
        <Link to="/browse">Browse Data</Link>
      </div>
    </DefaultTemplate>
  );
}
export default AboutPage;
