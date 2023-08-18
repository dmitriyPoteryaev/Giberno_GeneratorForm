import React from "react";

import FormPage from "@modules/FormPage";
import ResultPage from "@modules/ResultPage";
import { Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <Routes>
      <Route path="test/formgen" element={<FormPage />} />
      <Route path="test/result" element={<ResultPage />} />
    </Routes>
  );
};

export default App;
