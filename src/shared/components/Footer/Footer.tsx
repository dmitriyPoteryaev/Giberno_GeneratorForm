import React from "react";

import "./Footer.css";

import { formStore } from "@store/index";
import { observer } from "mobx-react-lite";

import Button from "../Button";
import Input from "../Input";

const Footer = observer(() => {
  const {
    getObjectWithInfoEmailInput,
    ChangeObjectWithInfoEmailInput,
    IsGeneralButtonActive,
  } = formStore;
  return (
    <footer className="FooterLayout">
      <div className="FooterLayout__block">
        <label className="FooterLayout__label">
          <Input
            InputClass={"FooterLayout__input"}
            type={getObjectWithInfoEmailInput?.type}
            placeholder={getObjectWithInfoEmailInput?.placeholder}
            value={getObjectWithInfoEmailInput?.value}
            onChange={(event: any) => ChangeObjectWithInfoEmailInput(event)}
          />
          {getObjectWithInfoEmailInput.help && (
            <div className="FooterLayout__helpblock">
              {getObjectWithInfoEmailInput.help}
            </div>
          )}
        </label>
        <Button
          ButtonClass={"FooterLayout__button"}
          disabled={IsGeneralButtonActive}
        >
          Сформировать карту
        </Button>
      </div>
    </footer>
  );
});

export default Footer;
