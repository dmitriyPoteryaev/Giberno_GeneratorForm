import React from "react";

import "./CustomSelect.css";
import { sortNamesPositionsByLetter } from "@utils/sortNamesPositionsByLetter";

const HELP_QUESTION: any = require("@assets/help_outline_24px.png");

const CustomSelect = ({ InputProps_First, actualPositionsStore }: any) => {
  const {
    name,
    currentNumber,
    onChange,
    isopen,
    value,
    placeholder,
    onFocus,
    IsShowInfoHelp,
    help,
    ChageIsShowInfoHelp,
    IsEmpty,
    IsRequire,
    className,
    ShowList,
    ChageFocus,
    uniqKey,
    ...rest
  } = InputProps_First;

  const handler = (elem: any) => {
    onChange(elem, currentNumber, name);
  };

  const isRedBorder = IsEmpty && !value.trim() && IsRequire;

  const sortinArrayPositon = sortNamesPositionsByLetter(
    actualPositionsStore,
    value
  );

  return (
    <div className="CustomSelect">
      <>
        <label key={uniqKey} className="FormPageLayout__label">
          <input
            name={name}
            className={
              className
                ? `Formpagelayout__input_nested ${className}`
                : "Formpagelayout__input_nested"
            }
            placeholder={!onFocus ? placeholder : ""}
            onChange={(event: any) =>
              onChange(event.target.value, currentNumber, name)
            }
            onClick={(event) => {
              if (currentNumber === 0) {
                event.stopPropagation();
                ShowList();
              } else {
                return;
              }
            }}
            onFocus={() => {
              ChageFocus(currentNumber, true);
            }}
            onBlur={() => ChageFocus(currentNumber, false)}
            {...rest}
            type="text"
            value={value}
            style={{
              border: isRedBorder ? "1px solid red" : "",
            }}
          />
          {help && (
            <div
              className="FormPageLayout__helpblock"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
            >
              <img
                className="FormPageLayout__helpblock"
                alt="help_icon"
                src={HELP_QUESTION}
                onClick={() => {
                  ChageIsShowInfoHelp(currentNumber);
                }}
              />
            </div>
          )}
          <span className="FormPageLayout__newPlaceHolder">
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
      </>
      {isopen && (
        <div className="CustomLIstForSelect">
          {sortinArrayPositon.map((elem: any) => (
            <div
              key={elem}
              className="CustomLIstForSelect_position"
              onClick={() => {
                handler(elem);
              }}
            >
              {elem}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
