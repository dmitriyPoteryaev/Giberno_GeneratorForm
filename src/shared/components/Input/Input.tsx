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
    onFocus,
    ChageFocus,
    getArrayWithAllInputs,
    getDescriptionRequireStore,
    getEmailRequireStore,
    getEmailEnabled,
    getDescriptionEnable,
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
          placeholder={!onFocus ? placeholder : ""}
          onChange={(event: any) => onChange(event.target.value)}
          {...rest}
          type="text"
          value={value}
          style={{
            border: onFocus
              ? "1px solid #7B7E80"
              : !value.trim() && getShowWhatInputIsEmpty
              ? "1px solid red"
              : "",
            borderBottom: onFocus
              ? "0.5px solid #7B7E80"
              : !value.trim() && getShowWhatInputIsEmpty
              ? "0.25px solid red"
              : "",
          }}
          onFocus={() => ChageFocus(currentNumber)}
          onBlur={() => ChageFocus(currentNumber)}
        />
        {help && (
          <div
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
              onClick={() => ChageIsShowInfoHelp(currentNumber)}
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
          placeholder={!onFocus ? placeholder : ""}
          onChange={(event: any) => {
            onChange(event.target.value);
          }}
          onFocus={() => ChageFocus(currentNumber)}
          onBlur={() => ChageFocus(currentNumber)}
          {...rest}
          type="text"
          value={value}
          style={{
            border: onFocus
              ? "1px solid #7B7E80"
              : !value.trim() && getShowWhatInputIsEmpty
              ? "1px solid red"
              : "",
            borderTop: onFocus
              ? "0.5px solid #7B7E80"
              : !value.trim() && getShowWhatInputIsEmpty
              ? "0.25px solid red"
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
          />
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
      </label>
    );
  }
  if (currentNumber === 1) {
    return (
      <>
        {getDescriptionEnable && (
          <label
            key={placeholder}
            className={
              classNameLabel ? classNameLabel : "FormPageLayout__label"
            }
          >
            <input
              className={
                classNameInput ? classNameInput : "FormPageLayout__input_nested"
              }
              placeholder={!onFocus ? placeholder : ""}
              onChange={(event: any) => onChange(event.target.value)}
              onFocus={() => ChageFocus(currentNumber)}
              onBlur={() => ChageFocus(currentNumber)}
              {...rest}
              type="text"
              value={value}
              style={{
                borderLeft: onFocus
                  ? "1px solid #7B7E80"
                  : !value.trim() &&
                    getShowWhatInputIsEmpty &&
                    getDescriptionRequireStore
                  ? "1px solid red"
                  : "",
                borderRight: onFocus
                  ? "1px solid #7B7E80"
                  : !value.trim() &&
                    getShowWhatInputIsEmpty &&
                    getDescriptionRequireStore
                  ? "1px solid red"
                  : "",
                borderTop: onFocus
                  ? "0.5px solid #7B7E80"
                  : !value.trim() &&
                    getShowWhatInputIsEmpty &&
                    getDescriptionRequireStore
                  ? "0.1px solid red"
                  : "",
                borderBottom: onFocus
                  ? "0.5px solid #7B7E80"
                  : !value.trim() &&
                    getShowWhatInputIsEmpty &&
                    getDescriptionRequireStore
                  ? "0.1px solid red"
                  : "",
              }}
            />
            {help && (
              <div
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                }}
              >
                <img
                  className={
                    classNameHelper
                      ? classNameHelper
                      : "FormPageLayout__helpblock"
                  }
                  alt="help_icon"
                  src={HELP_QUESTION}
                  onClick={() => ChageIsShowInfoHelp(currentNumber)}
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
                onClick={() => ChageIsShowInfoHelp(currentNumber)}
                className="Block-Modal"
              >
                {help}
              </div>
            )}
          </label>
        )}
      </>
    );
  }

  return (
    <>
      {getEmailEnabled && (
        <label
          key={placeholder}
          className={classNameLabel ? classNameLabel : "FormPageLayout__label"}
        >
          <input
            className={
              classNameInput ? classNameInput : "FormPageLayout__input"
            }
            placeholder={!onFocus ? placeholder : ""}
            onChange={(event: any) => onChange(event.target.value)}
            onFocus={() => {
              ChageFocus(currentNumber);
            }}
            onBlur={() => ChageFocus(currentNumber)}
            {...rest}
            type="text"
            value={value}
            style={{
              border: onFocus
                ? "1px solid #7B7E80"
                : (getShowWhatInputIsEmpty &&
                    !value.trim() &&
                    getEmailRequireStore) ||
                  (!resultValidMail(value) && getShowWhatInputIsEmpty)
                ? "1px solid red"
                : "",
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
                  classNameHelper
                    ? classNameHelper
                    : "FormPageLayout__helpblock"
                }
                alt="help_icon"
                src={HELP_QUESTION}
                onClick={() => {
                  ChageIsShowInfoHelp(currentNumber);
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
              onClick={() => ChageIsShowInfoHelp(currentNumber)}
              className="Block-Modal"
            >
              {help}
            </div>
          )}
        </label>
      )}
    </>
  );
};

export default Input;
