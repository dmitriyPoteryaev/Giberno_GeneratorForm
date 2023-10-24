import React, { memo, PropsWithChildren } from "react";

import "./CustomInput.css";

import { InputElement } from "../../../types/formTypes";

type InputElenentPropsWithChildren = PropsWithChildren & InputElement;
type InputEvent = React.ChangeEvent<HTMLInputElement>;

const CustomInput: React.FC<InputElenentPropsWithChildren> = memo(
  (props) => {
    const {
      value,
      placeholder,
      onChange,
      currentNumber,
      IsEmpty,
      isValidMail,
      onFocus,
      ChageFocus,
      className,
      name,
      IsRequire,
      children,
    } = props;

    let isRedBorder;
    if (typeof currentNumber === "number") {
      isRedBorder = IsEmpty && !value.trim() && IsRequire;
    } else {
      isRedBorder =
        (IsEmpty && !value.trim() && IsRequire) || (!isValidMail && IsEmpty);
    }
    return (
      <label
        className={
          typeof isValidMail === "boolean"
            ? "FooterLayout__label"
            : "FormPageLayout__label"
        }
      >
        <input
          name={name}
          data-testid="input-item"
          className={className}
          placeholder={!onFocus ? placeholder : ""}
          onChange={(event: InputEvent) => {
            onChange(event.target.value, name);
          }}
          onFocus={() => {
            ChageFocus(true);
          }}
          onBlur={() => ChageFocus(false)}
          type="text"
          value={value}
          style={{
            border: isRedBorder ? "1px solid red" : "",
          }}
        />
        {children}
      </label>
    );
  },
  (prevProps: any, nextProps: any) => {
    if (
      prevProps.isopen === nextProps.isopen &&
      prevProps.value === nextProps.value &&
      prevProps.IsShowInfoHelp === nextProps.IsShowInfoHelp &&
      prevProps.onFocus === nextProps.onFocus &&
      prevProps.IsEmpty === nextProps.IsEmpty &&
      prevProps.classNameInput === nextProps.classNameInput &&
      prevProps.className === nextProps.className
    ) {
      return true;
    }
    return false;
  }
);

export default CustomInput;
