import React from "react";

import "./AdditionalBlocks.css";

const HELP_QUESTION: string = require("@assets/help_outline_24px.png");

/**
 * Отдельный функциональный компонет, отвечающий за отдельные блоки на конкретным полем формы.
 * Данные блоки имеют в стилях position: absolute, а само поле имеет position: relative
 *
 */
const AdditionalBlocks = (props: any) => {
  const {
    classNameHelper,
    help,
    ChageIsShowInfoHelp,
    classNamePlaceHolder,
    onFocus,
    value,
    placeholder,
    IsShowInfoHelp,
  } = props;

  return (
    <>
      {" "}
      {help && (
        <div
          className={classNameHelper}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
        >
          <img
            className={classNameHelper}
            alt="help_icon"
            src={HELP_QUESTION}
            onClick={() => {
              ChageIsShowInfoHelp(!IsShowInfoHelp);
            }}
          />
        </div>
      )}
      <span className={classNamePlaceHolder}>
        {onFocus || value ? placeholder : ""}
      </span>
      {IsShowInfoHelp && (
        <div onClick={() => ChageIsShowInfoHelp()} className="Block-Modal">
          {help}
        </div>
      )}
    </>
  );
};

export default AdditionalBlocks;
