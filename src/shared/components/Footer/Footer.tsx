import React, { useState, memo } from "react";

import "./Footer.css";

import { checkValidMail } from "@utils/checkValidMail";

import useDeleteAllPopUpWindowEmail from "../../../hooks/useDeleteAllPopUpWindowEmail";
import { ObjectInputProps, InputElement } from "../../../types/formTypes";
import Button from "../Button";
import CustomInput from "../CustomInput";
import AdditionalBlocks from "../SelectOrInput/AdditionalBlocks";

export type FooterProps = {
  /**  */
  EmailInputStore: ObjectInputProps;
  /**  */
  changeGlobalStateEmailInput: (value: ObjectInputProps) => void;
  /**b */
  handlerPostQuery: () => void;
  /**  */
  isRedBorder: boolean;
};

const Footer: React.FC<FooterProps> = memo(
  (props) => {
    const {
      EmailInputStore,
      isRedBorder,
      changeGlobalStateEmailInput,
      handlerPostQuery,
    } = props;
    const [EmailInpitState, setEmailInpitState] = useState(EmailInputStore);

    useDeleteAllPopUpWindowEmail(setEmailInpitState, EmailInpitState);
    const {
      placeholder,
      value,
      help,
      IsShowInfoHelp,
      onFocus,
      IsRequire,
      IsEnabled,
    }: any = EmailInpitState;

    const changePosition = (
      obj: ObjectInputProps,
      value: any,
      position: string
    ) => {
      return { ...obj, [position]: value };
    };

    const InputProps: InputElement = {
      ...EmailInpitState,
      key: "input_email",
      IsEmpty: isRedBorder,
      className: "FooterLayout__input",

      ChageFocus: (isFocus: boolean) => {
        setEmailInpitState((prevState: ObjectInputProps) => {
          return changePosition(prevState, isFocus, "onFocus");
        });
      },
      ChageIsShowInfoHelp: (value: boolean) => {
        setEmailInpitState((prevState: ObjectInputProps) => {
          return changePosition(prevState, value, "IsShowInfoHelp");
        });
      },
      isValidMail: checkValidMail(IsRequire, value),
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
          {IsEnabled && (
            <CustomInput {...InputProps}>
              <AdditionalBlocks
                classNameHelper="FooterLayout__helpblock"
                help={help}
                ChageIsShowInfoHelp={InputProps.ChageIsShowInfoHelp}
                classNamePlaceHolder="FooterLayout__newPLaceHolderBlock"
                onFocus={onFocus}
                value={value}
                placeholder={placeholder}
                IsShowInfoHelp={IsShowInfoHelp}
              />
            </CustomInput>
          )}
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
