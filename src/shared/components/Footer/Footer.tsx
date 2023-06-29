import React from "react";

import "./Footer.css";

import { formStore } from "@store/index";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import Button from "../Button";
import Input from "../Input";

const Footer = observer(() => {
  const {
    getObjectWithInfoEmailInput,
    ChangeObjectWithInfoEmailInput,
    IsGeneralButtonActive,
    getkeyGenStore,
  } = formStore;

  const navigate = useNavigate();

  const handlerPostQuery = () => {
    navigate("/result?key_gen=" + getkeyGenStore);
  };
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
          onClick={handlerPostQuery}
        >
          Сформировать карту
        </Button>
      </div>
    </footer>
  );
});

export default Footer;
