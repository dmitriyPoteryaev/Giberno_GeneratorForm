import React, { ReactElement } from "react";

import { MemoryRouter } from "react-router-dom";

import AppRoter from "../../../../routes/AppRoter";

const RenderWithRoter = (component: ReactElement | null, route: string) => {
  return (
    <MemoryRouter initialEntries={[route]}>
      <AppRoter />
      {component}
    </MemoryRouter>
  );
};

export default RenderWithRoter;
