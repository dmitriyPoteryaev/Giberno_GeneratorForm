import React, { useCallback, useRef, useEffect, useState, memo } from "react";

import "./Footer.css";
import { rootStore } from "@store/index";
import { checkValidMail } from "@utils/checkValidMail";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import { ObjectInputProps } from "../../../types/formTypes";
import Button from "../Button";
import Input from "../Input";
const Footer = memo(
  (props: any) => {
    const {
      EmailInputStore,
      isRedBorder,
      changeGlobalStateEmailInput,
      handlerPostQuery,
    } = props;
    const [EmailInpitState, setEmailInpitState] = useState(EmailInputStore);
    // useEffect(() => {
    //   document.addEventListener("click", DeleteAllPopUpWindow);

    //   return () => {
    //     document.removeEventListener("click", DeleteAllPopUpWindow);
    //   };
    // }, []);

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
    }: any = EmailInpitState;

    const changePosition = (obj: any, value: any, position: any) => {
      return { ...obj, [position]: value };
    };

    const InputProps = {
      type: type,
      placeholder: placeholder,
      value: value,
      help: help,
      name: name,
      uniqKey: "input_email",
      IsEmpty: isRedBorder,
      onFocus: onFocus,
      IsShowInfoHelp: IsShowInfoHelp,
      classNameLabel: "FooterLayout__label",
      classNameHelper: "FooterLayout__helpblock",
      classNamePlaceHolder: "FooterLayout__newPLaceHolderBlock",
      classNameInput: "FooterLayout__input",
      IsRequire: IsRequire,
      ChageFocus: (isFocus: boolean) => {
        setEmailInpitState((prevState: ObjectInputProps) => {
          return changePosition(prevState, isFocus, "onFocus");
        });
      },
      ChageIsShowInfoHelp: () => {
        setEmailInpitState((prevState: ObjectInputProps) => {
          return changePosition(prevState, true, "IsShowInfoHelp");
        });
      },
      resultValidMail: checkValidMail(IsRequire, value),
      onChange: (value: string) => {
        setEmailInpitState((prevState: ObjectInputProps) => {
          return changePosition(prevState, value, "value");
        });
      },
    };

    changeGlobalStateEmailInput(EmailInpitState);

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
            onClick={handlerPostQuery}
          >
            Сформировать оплату
          </Button>
        </div>
      </footer>
    );
  },
  (prevProps: any, nextProps: any) => {
    if (prevProps.isRedBorder === nextProps.isRedBorder) {
      return true;
    } else {
      return false;
    }
  }
);

export default Footer;
