import React from "react";
import DefaultTemplate from "../page-templates/DefaultTemplate";
import TableEditor from '../organisms/TableEditor';


function Homepage() {
  return (
    <DefaultTemplate>
      <TableEditor />
    </DefaultTemplate>
  );
}

export default Homepage;
