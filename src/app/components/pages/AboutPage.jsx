import React from 'react';
import { Link } from 'react-router-dom';
import CodeEditor from '../atoms/CodeEditor';
import DatabaseList from '../molecules/DatabaseList';
import DefaultTemplate from '../page-templates/DefaultTemplate';

function AboutPage(props) {

  return (
    <DefaultTemplate>
      <div className='simple-page'>
        <p>Tableland is an amazing thing</p>
        <Link to="/">Home</Link>
        <Link to="/browse">Browse Data</Link>
        <DatabaseList />
      </div>

    </DefaultTemplate>
  );
}
export default AboutPage;
