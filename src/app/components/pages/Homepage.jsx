import React from "react";
import DefaultTemplate from "../page-templates/DefaultTemplate";
import TableEditor from '../organisms/TableEditor';
import { Link, useLocation } from "react-router-dom";
import { Routes, Route } from 'react-router';
import BrowseData from "../organisms/BrowseData";
import ExecuteSqlWindow from "../organisms/ExecuteSqlWindow";
import StagedWritesWindow from '../molecules/StagedWritesWindow';
import CreateTable from "../organisms/CreateTable";

function isPage(page, location) {
  return location.pathname===page ? "active" : "not-active";
}

function Homepage() {
  const l = useLocation();
  return (
    <DefaultTemplate>      
      <div className="page-content-wrapper">
        <div className="page-section">
          <ul className="tab-nav">            
            <li className={isPage("/", l)}><Link to="/">Create Table</Link></li>
            <li className={isPage("/my-tables", l)}><Link to="/my-tables">My Tables</Link></li>
            <li className={isPage("/browse", l)}><Link to="/browse">Browse Data</Link></li>
            <li className={isPage("/execute", l)}><Link to="/execute">Execute SQL</Link></li>
          </ul>
          <div className="tab-section">
            <Routes>
              <Route path="/" element={<CreateTable />} />
              <Route path="/browse" element={<BrowseData />} />              
              <Route path="/execute" element={<ExecuteSqlWindow />} />
              <Route path="/my-tables" element={<TableEditor />} />            
            </Routes>
          </div>
        </div>      
        {/* <StagedWritesWindow />          */}
      </div>      
    </DefaultTemplate>
  );
}

export default Homepage;
