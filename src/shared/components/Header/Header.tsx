import React from "react";

import "./Header.css";

import { formStore } from "@store/index";
import { observer } from "mobx-react-lite";

const Logo = require("@assets/Logo.svg").default as string;
const Header = observer(() => {
  const { getemployeeNameStore } = formStore;

  return (
    <header className="HeaderLayout">
      {" "}
      <div className="HeaderLayout__innerBlock">
        {" "}
        <img alt="HeaderLayout__logo" src={Logo} />
        <div>{getemployeeNameStore}</div>
      </div>
    </header>
  );
});

export default Header;
