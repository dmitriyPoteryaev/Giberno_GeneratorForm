import React from "react";

import FormPage from "@modules/FormPage";
import ResultPage from "@modules/ResultPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="test/formgen" element={<FormPage />} />
          <Route path="test/result" element={<ResultPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
