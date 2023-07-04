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
    getShowWhatInputIsEmpty,
    IsShowInfoHelp,
    ChageIsShowInfoHelp,
    resultValidMail,
    ...rest
  } = props;

  if (currentNumber === 0) {
    return (
      <label
        key={placeholder}
        className={classNameLabel ? classNameLabel : "FormPageLayout__label"}
      >
        <input
          className={
            classNameInput ? classNameInput : "FormPageLayout__input_first"
          }
          placeholder={placeholder}
          onChange={(event: any) => onChange(event.target.value)}
          {...rest}
          type="text"
          value={value}
          style={{
            border:
              !value.trim() && getShowWhatInputIsEmpty ? "1px solid red" : "",
            borderBottom:
              !value.trim() && getShowWhatInputIsEmpty ? "none" : "",
          }}
        />
        {help && (
          <img
            className={
              classNameHelper ? classNameHelper : "FormPageLayout__helpblock"
            }
            alt="help_icon"
            src={HELP_QUESTION}
            onClick={() => ChageIsShowInfoHelp(currentNumber)}
          />
        )}
        <span
          className={
            classNamePlaceHolder
              ? classNamePlaceHolder
              : "FormPageLayout__newPlaceHolder"
          }
        >
          {value ? placeholder : ""}
        </span>
        {IsShowInfoHelp && (
          <div
            onClick={() => ChageIsShowInfoHelp(currentNumber)}
            className="Block-Modal"
          >
            {help}
          </div>
        )}
      </label>
    );
  }

  if (currentNumber === 2) {
    return (
      <label
        key={placeholder}
        className={classNameLabel ? classNameLabel : "FormPageLayout__label"}
      >
        <input
          className={
            classNameInput ? classNameInput : "FormPageLayout__input_last"
          }
          placeholder={placeholder}
          onChange={(event: any) => onChange(event.target.value)}
          {...rest}
          type="text"
          value={value}
          style={{
            border:
              !value.trim() && getShowWhatInputIsEmpty ? "1px solid red" : "",
            borderTop: !value.trim() && getShowWhatInputIsEmpty ? "none" : "",
          }}
        />
        {help && (
          <img
            className={
              classNameHelper ? classNameHelper : "FormPageLayout__helpblock"
            }
            alt="help_icon"
            src={HELP_QUESTION}
          />
        )}
        <span
          className={
            classNamePlaceHolder
              ? classNamePlaceHolder
              : "FormPageLayout__newPlaceHolder"
          }
        >
          {value ? placeholder : ""}
        </span>
      </label>
    );
  }
  if (currentNumber === 1) {
    return (
      <label
        key={placeholder}
        className={classNameLabel ? classNameLabel : "FormPageLayout__label"}
      >
        <input
          className={
            classNameInput ? classNameInput : "FormPageLayout__input_nested"
          }
          placeholder={placeholder}
          onChange={(event: any) => onChange(event.target.value)}
          {...rest}
          type="text"
          value={value}
          style={{
            border:
              !value.trim() && getShowWhatInputIsEmpty ? "1px solid red" : "",
          }}
        />
        {help && (
          <img
            className={
              classNameHelper ? classNameHelper : "FormPageLayout__helpblock"
            }
            alt="help_icon"
            src={HELP_QUESTION}
            onClick={() => ChageIsShowInfoHelp(currentNumber)}
          />
        )}
        <span
          className={
            classNamePlaceHolder
              ? classNamePlaceHolder
              : "FormPageLayout__newPlaceHolder"
          }
        >
          {value ? placeholder : ""}
        </span>
        {IsShowInfoHelp && (
          <div
            onClick={() => ChageIsShowInfoHelp(currentNumber)}
            className="Block-Modal"
          >
            {help}
          </div>
        )}
      </label>
    );
  }
  return (
    <label
      key={placeholder}
      className={classNameLabel ? classNameLabel : "FormPageLayout__label"}
    >
      <input
        className={classNameInput ? classNameInput : "FormPageLayout__input"}
        placeholder={placeholder}
        onChange={(event: any) => onChange(event.target.value)}
        {...rest}
        type="text"
        value={value}
        style={{
          border:
            getShowWhatInputIsEmpty || (!value.trim() && resultValidMail(value))
              ? "1px solid red"
              : "",
        }}
      />
      {help && (
        <img
          className={
            classNameHelper ? classNameHelper : "FormPageLayout__helpblock"
          }
          alt="help_icon"
          src={HELP_QUESTION}
          onClick={() => ChageIsShowInfoHelp(currentNumber)}
        />
      )}
      <span
        className={
          classNamePlaceHolder
            ? classNamePlaceHolder
            : "FormPageLayout__newPlaceHolder"
        }
      >
        {value ? placeholder : ""}
      </span>
      {IsShowInfoHelp && (
        <div
          onClick={() => ChageIsShowInfoHelp(currentNumber)}
          className="Block-Modal"
        >
          {help}
        </div>
      )}
    </label>
  );
};

export default Input;
