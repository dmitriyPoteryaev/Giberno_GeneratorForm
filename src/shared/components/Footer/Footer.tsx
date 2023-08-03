import React from "react";

import "./Footer.css";
import { formStore } from "@store/index";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import Button from "../Button";
import Input from "../Input";

const Footer = observer((): any => {
  const {
    ArrayWithAllInputsStore,
    ChageIsShowInfoHelp,
    ChageFocus,
    ChageShowWhatInputIsEmpty,
    keyGenStore,
    getShowWhatInputIsEmpty,
    ObjectWithInfoEmailInputStore,
    ChangeObjectWithInfoEmailInput,
    IsGeneralButtonActive,
  } = formStore;
  const {
    type,
    placeholder,
    value,
    help,
    IsShowInfoHelp,
    onFocus,
    IsRequire,
    IsEnabled,
  }: any = ObjectWithInfoEmailInputStore;

  const checkValidMail = (mail: any) => {
    if (!IsRequire && mail === "") {
      return true;
    }
    let reg: any =
      /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    return reg.test(mail?.toLowerCase());
  };
  const InputProps = {
    type: type,
    placeholder: placeholder,
    value: value,
    help: help,
    uniqKey: "input_email",
    IsEmpty: getShowWhatInputIsEmpty,
    onFocus: onFocus,
    IsShowInfoHelp: IsShowInfoHelp,
    classNameLabel: "FooterLayout__label",
    classNameHelper: "FooterLayout__helpblock",
    classNamePlaceHolder: "FooterLayout__newPLaceHolderBlock",
    classNameInput: "FooterLayout__input",
    IsRequire: IsRequire,
    ChageFocus: ChageFocus,
    ChageIsShowInfoHelp: ChageIsShowInfoHelp,
    resultValidMail: checkValidMail,
    onChange: () => {
      ChangeObjectWithInfoEmailInput(value);
    },
  };

  const navigate = useNavigate();

  const handlerPostQuery = () => {
    if (
      !IsGeneralButtonActive &&
      checkValidMail(value) &&
      (ArrayWithAllInputsStore.find((elem: any) => elem.placeholder === "Сумма")
        ?.value?.split(".")[1]
        ?.split("").length ||
        !ArrayWithAllInputsStore.find(
          (elem: any) => elem.placeholder === "Сумма"
        )?.value?.includes("."))
    ) {
      navigate("/result?key_gen=" + keyGenStore);
    } else {
      ChageShowWhatInputIsEmpty(true);
    }
  };

  return (
    <footer className="FooterLayout">
      <div className="FooterLayout__block">
        {IsEnabled && <Input {...InputProps} />}
        <Button
          ButtonClass={
            IsEnabled
              ? "FooterLayout__button"
              : "FooterLayout__button_withoutInput"
          }
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
