import React from "react";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  /** Значение поля */
  value: string;
  InputClass: any;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: any) => any;
};

const Input = (props: any) => {
  const { value, placeholder, InputClass, onChange, ...rest } = props;

  return (
    <input
      className={InputClass}
      style={{ border: !value.trim() ? "2px solid red" : "" }}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(event: any) => onChange(event.target.value)}
      {...rest}
    />
  );
};

export default Input;
