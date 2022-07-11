import React from 'react';
import { Link } from 'react-router-dom';
import CreateTable from '../organisms/CreateTable';
import DefaultTemplate from '../page-templates/DefaultTemplate';

function AboutPage(props) {

  return (
    <DefaultTemplate>
      <div className='simple-page'>
        <CreateTable />
      </div>
    </DefaultTemplate>
  );
}
export default AboutPage;
