import React from "react";

import FormPage from "@modules/FormPage/FormPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<FormPage />} />
          <Route path="/form" element={<FormPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
