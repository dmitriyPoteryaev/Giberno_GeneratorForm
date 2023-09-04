import React, { useCallback, useRef, useEffect } from "react";

import "./Footer.css";
import { formStore } from "@store/index";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import { ObjectInputProps } from "../../../types/formTypes";
import Button from "../Button";
import Input from "../Input";
const Footer = observer(() => {
  const {
    ChageIsShowInfoHelp,
    ChageFocus,
    ChageShowWhatInputIsEmpty,
    keyGenStore,
    ShowWhatInputIsEmpty,
    ObjectWithInfoEmailInputStore,
    ChangeObjectWithInfoEmailInput,
    positionTypeStore,
    IsGeneralButtonDisabled,
    isValidMail,
    DeleteAllPopUpWindow,
  } = formStore;

  useEffect(() => {
    document.addEventListener("click", DeleteAllPopUpWindow);

    return () => {
      document.removeEventListener("click", DeleteAllPopUpWindow);
    };
  }, []);
  const {
    type,
    placeholder,
    value,
    help,
    IsShowInfoHelp,
    onFocus,
    IsRequire,
    IsEnabled,
    name,
  }: ObjectInputProps = ObjectWithInfoEmailInputStore;

  const IsGeneralButtonDisabledRef = useRef<any>();
  const isValidMaildRef = useRef();

  IsGeneralButtonDisabledRef.current = IsGeneralButtonDisabled;
  isValidMaildRef.current = isValidMail;

  console.log(IsGeneralButtonDisabledRef.current);

  const InputProps = {
    type: type,
    placeholder: placeholder,
    value: value,
    help: help,
    name: name,
    uniqKey: "input_email",
    IsEmpty: ShowWhatInputIsEmpty,
    onFocus: onFocus,
    IsShowInfoHelp: IsShowInfoHelp,
    classNameLabel: "FooterLayout__label",
    classNameHelper: "FooterLayout__helpblock",
    classNamePlaceHolder: "FooterLayout__newPLaceHolderBlock",
    classNameInput: "FooterLayout__input",
    IsRequire: IsRequire,
    ChageFocus: ChageFocus,
    ChageIsShowInfoHelp: ChageIsShowInfoHelp,
    resultValidMail: isValidMail,
    onChange: (type: string, value: string, name: string, isopen: boolean) => {
      if (positionTypeStore === "MANUAL" || typeof isopen !== "boolean") {
        ChangeObjectWithInfoEmailInput(value);
      } else {
        return;
      }
    },
  };
  const navigate = useNavigate();

  const handlerPostQuery = useCallback(() => {
    if (!IsGeneralButtonDisabledRef.current && isValidMaildRef.current) {
      navigate("/test/result?key_gen=" + keyGenStore);
    } else {
      ChageShowWhatInputIsEmpty(true);
    }
  }, []);

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
          disabled={IsGeneralButtonDisabled}
          onClick={handlerPostQuery}
        >
          Сформировать оплату
        </Button>
      </div>
    </footer>
  );
});

export default Footer;
