import React from "react";
import DefaultTemplate from "../page-templates/DefaultTemplate";

import Mainbar from "../organisms/ExecuteSqlSection";
import Sidebar from "../organisms/Sidebar";
import TallyPopup from "../atoms/TallyPopup";
import Toasts from "../molecules/Toasts";


function Homepage() {
  return (
    <DefaultTemplate>     
      <Sidebar />
      <Mainbar />  
      <TallyPopup />
      <Toasts />
    </DefaultTemplate>
  );
}

export default Homepage;
