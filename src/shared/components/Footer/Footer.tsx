import React, { useState } from "react";

import styled from "styled-components";

import Button from "../Button";
import Input from "../Input";

const FooterLayout = styled.footer`
  display: flex;
  justify-content: center;

  background: #fff;
  bottom: 0px;
  box-shadow: 1px 0 11px rgba(0, 0, 0, 0.09);
  left: 0;
  padding: 9px 16px 16px;
  position: fixed;
  right: 0;
  z-index: 1;
  height: 106px;
`;

const FooterLayout__block = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
`;

const FooterLayout__input = styled.input`
  border-radius: 5px;
  border: 1px solid gray;
  width: 400px;
  height: 50px;
  color: #b2bdc7;
  font-size: 20px;
  padding-left: 15px;
`;
const FooterLayout__button = styled.button`
  font-size: 24px;
  background: #0a7272;
  color: white;
  border: none;
  height: 60px;
  width: 320px;
  margin-left: 30px;
  border-radius: 10px;
`;

const Footer = () => {
  const [emailClient, setEmailClient] = useState<string>("");

  return (
    <FooterLayout>
      <FooterLayout__block>
        <Input
          InputClass={FooterLayout__input}
          type="email"
          placeholder={"Email клиента"}
          value={emailClient}
          onChange={setEmailClient}
        />
        <Button ButtonClass={FooterLayout__button} disabled={false}>
          Сформировать карту
        </Button>
      </FooterLayout__block>
    </FooterLayout>
  );
};

export default Footer;
