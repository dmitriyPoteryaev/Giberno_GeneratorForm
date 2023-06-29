import React from "react";

import "./Header.css";
import { formStore } from "@store/index";
import { observer } from "mobx-react-lite";

const LOGO_GIBERNO: string = require("@assets/logo.png");

const Header = observer(() => {
  const { getemployeeNameStore } = formStore;
  return (
    <header className="HeaderLayout">
      <img alt="icon_arrow" src={LOGO_GIBERNO} />
      <div>{getemployeeNameStore}</div>
    </header>
  );
});

export default Header;
