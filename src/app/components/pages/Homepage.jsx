import React from "react";
import DefaultTemplate from "../page-templates/DefaultTemplate";

import Mainbar from "../organisms/ExecuteSqlSection";
import Sidebar from "../organisms/Sidebar";


function Homepage() {
  return (
    <DefaultTemplate>     
      <Sidebar />
      <Mainbar />  
    </DefaultTemplate>
  );
}

export default Homepage;
