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
    ChageShowWhatInputIsEmpty,
    getShowWhatInputIsEmpty,
    ChageIsShowInfoHelp,
  } = formStore;

  const navigate = useNavigate();

  const checkValidMail = (mail: any) => {
    let reg: any =
      /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    return reg.test(mail?.toLowerCase());
  };

  const handlerPostQuery = () => {
    if (
      !IsGeneralButtonActive &&
      checkValidMail(getObjectWithInfoEmailInput?.value)
    ) {
      navigate("/result?key_gen=" + getkeyGenStore);
    } else {
      ChageShowWhatInputIsEmpty(true);
    }
  };
  return (
    <footer className="FooterLayout">
      <div className="FooterLayout__block">
        <Input
          type={getObjectWithInfoEmailInput?.type}
          placeholder={getObjectWithInfoEmailInput?.placeholder}
          value={getObjectWithInfoEmailInput?.value}
          classNameInput={"FooterLayout__input"}
          classNameLabel={"FooterLayout__label"}
          classNameHelper={"FooterLayout__helpblock"}
          classNamePlaceHolder={"FooterLayout__newPLaceHolderBlock"}
          onChange={(event: any) => {
            ChangeObjectWithInfoEmailInput(event);
            checkValidMail(event);
          }}
          ChageIsShowInfoHelp={ChageIsShowInfoHelp}
          resultValidMail={checkValidMail}
          IsShowInfoHelp={getObjectWithInfoEmailInput?.IsShowInfoHelp}
          help={getObjectWithInfoEmailInput?.help}
          getShowWhatInputIsEmpty={getShowWhatInputIsEmpty}
        />
        <Button
          ButtonClass={"FooterLayout__button"}
          disabled={IsGeneralButtonActive}
          onClick={handlerPostQuery}
        >
          Сформировать оплату
        </Button>
      </div>
    </footer>
  );
});

export default Footer;
