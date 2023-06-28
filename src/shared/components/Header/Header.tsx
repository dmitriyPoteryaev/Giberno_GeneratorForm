import React from "react";

import styled from "styled-components";

const HeaderLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  height: 60px;
  padding: 0 16px;
  width: 100%;
  border-bottom: 0.5px solid gray;
  color: #2c555b;
`;

const LOGO_GIBERNO: string = require("@assets/logo.png");

const Header = () => {
  return (
    <HeaderLayout>
      <img alt="icon_arrow" src={LOGO_GIBERNO} />
      <div>Воронцов А.С.</div>
    </HeaderLayout>
  );
};

export default Header;
