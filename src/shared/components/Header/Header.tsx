import React from "react";

import "./Header.css";

import { rootStore } from "@store/index";
import { observer } from "mobx-react-lite";

const Logo = require("@assets/Logo.svg").default as string;
const Header = observer(() => {
  const { employeeNameStore } = rootStore;

  return (
    <header className="HeaderLayout">
      {" "}
      <div className="HeaderLayout__innerBlock">
        {" "}
        <img alt="HeaderLayout__logo" src={Logo} />
        <div>{employeeNameStore}</div>
      </div>
    </header>
  );
});

export default Header;
