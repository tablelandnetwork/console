import React from 'react';
import { Link } from 'react-router-dom';
import CodeEditor from '../atoms/CodeEditor';
import DefaultTemplate from '../page-templates/DefaultTemplate';

function AboutPage(props) {

  return (
    <DefaultTemplate>
      <div className='about'>
        <p>Tableland is an amazing thing</p>
        <Link to="/">Home</Link>
        <Link to="/browse">Browse Data</Link>
      </div>

    </DefaultTemplate>
  );
}
export default AboutPage;
