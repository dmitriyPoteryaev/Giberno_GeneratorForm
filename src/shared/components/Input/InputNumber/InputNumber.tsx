import React, { FC } from "react";

import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";

const defaultMaskOptions = {
  prefix: "",
  suffix: "",
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: "",
  allowDecimal: true,
  decimalSymbol: "." || ",",
  decimalLimit: 2, // how many digits allowed after the decimal
  integerLimit: 6, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
};

export type BLOCK_TIPS__INPUTProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
};

const InputNumber: FC<BLOCK_TIPS__INPUTProps> = ({
  value,
  onChange,
  maskOptions,
  ...inputProps
}: any) => {
  const TipsMaskInput = createNumberMask({
    ...defaultMaskOptions,
    ...maskOptions,
  });

  return (
    <MaskedInput
      mask={TipsMaskInput}
      {...inputProps}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputNumber;
