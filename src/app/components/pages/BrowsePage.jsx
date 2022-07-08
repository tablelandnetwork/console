import React from "react";
import { useSelector } from "react-redux";
import DefaultTemplate from "../page-templates/DefaultTemplate";

function BrowsePage() {
  const databases = useSelector(store => store.databases);

  return (
    <DefaultTemplate>

    </DefaultTemplate>
  );
}

export default BrowsePage;
