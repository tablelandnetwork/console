import React from "react";
import reactDom from "react-dom/client";
import init from "@tableland/sqlparser";
import Main from "./components/ContextProviders";

void init();

document.addEventListener("DOMContentLoaded", () => {
  reactDom.createRoot(document.getElementById("app")).render(<Main />);
});
