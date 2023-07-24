import React from "react";

import "./Input.css";

const HELP_QUESTION: any = require("@assets/help_outline_24px.png");

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: any) => any;
};

const Input = (props: any) => {
  const {
    value,
    placeholder,
    onChange,
    help,
    classNameInput,
    classNameLabel,
    classNameHelper,
    classNamePlaceHolder,
    currentNumber,
    IsEmpty,
    IsShowInfoHelp,
    ChageIsShowInfoHelp,
    resultValidMail,
    onFocus,
    ChageFocus,
    className,
    name,
    IsRequire,
    uniqKey,
    ShowList,
    isopen,
    ...rest
  } = props;

  let isRedBorder;
  if (typeof currentNumber === "number") {
    isRedBorder = IsEmpty && !value.trim() && IsRequire;
  } else {
    isRedBorder =
      (IsEmpty && !value.trim() && IsRequire) ||
      (!resultValidMail(value) && IsEmpty);
  }
  return (
    <label
      key={uniqKey}
      className={classNameLabel ? classNameLabel : "FormPageLayout__label"}
    >
      <input
        name={name}
        className={
          classNameInput
            ? classNameInput
            : className
            ? `Formpagelayout__input_nested ${className}`
            : "Formpagelayout__input_nested"
        }
        placeholder={!onFocus ? placeholder : ""}
        onChange={(event: any) => {
          onChange(event.type, event.target.value, name, isopen);
        }}
        onClick={(event) => {
          if (uniqKey.split("_")[0] === "select") {
            event.stopPropagation();
            ShowList(name);
          } else {
            return;
          }
        }}
        onFocus={() => {
          ChageFocus(currentNumber, placeholder, true);
        }}
        onBlur={() => ChageFocus(currentNumber, placeholder, false)}
        {...rest}
        type="text"
        value={value}
        style={{
          border: isRedBorder ? "1px solid red" : "",
        }}
      />
      {help && (
        <div
          className={
            classNameHelper ? classNameHelper : "FormPageLayout__helpblock"
          }
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
        >
          <img
            className={
              classNameHelper ? classNameHelper : "FormPageLayout__helpblock"
            }
            alt="help_icon"
            src={HELP_QUESTION}
            onClick={() => {
              ChageIsShowInfoHelp(name, currentNumber);
            }}
          />
        </div>
      )}
      <span
        className={
          classNamePlaceHolder
            ? classNamePlaceHolder
            : "FormPageLayout__newPlaceHolder"
        }
      >
        {onFocus || value ? placeholder : ""}
      </span>
      {IsShowInfoHelp && (
        <div
          onClick={() => ChageIsShowInfoHelp(name, currentNumber)}
          className="Block-Modal"
        >
          {help}
        </div>
      )}
    </label>
  );
};

export default Input;
