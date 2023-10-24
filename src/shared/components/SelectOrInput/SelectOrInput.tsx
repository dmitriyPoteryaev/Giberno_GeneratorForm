import React from "react";

import CustomInput from "@shared/components/CustomInput/CustomInput";
import AdditionalBlocks from "@shared/components/SelectOrInput/AdditionalBlocks";
import { MapArrayItemsBySpecificKey } from "@utils/MapArrayItemsBySpecificKey";

import CustomSelect from "../CustomSelect/CustomSelect";
import "./SelectOrInput.css";

const Select: any = {
  first: [CustomSelect, "first", "name"],
  nested: [CustomSelect, "nested", "description"],
};

const Input: any = {
  first: [CustomInput, "first"],
  nested: [CustomInput, "nested"],
  last: [CustomInput, "last"],
};

const SelectOrInput = (props: any) => {
  const { SelectProps, InputProps, LAST_NUMBER, i } = props;

  const { isopen } = InputProps;
  const { itemliststore } = SelectProps;

  const positionInForm =
    i === 0 ? "first" : i === LAST_NUMBER ? "last" : "nested";

  if (typeof isopen === "boolean") {
    const [Component, position, title] = Select[positionInForm];
    const SelectProps_arg = {
      className:
        "FormPageLayout__input_generic FormPagelayout__select FormPageLayout__input_" +
        position,
      actualPositionsStore: MapArrayItemsBySpecificKey(itemliststore, title),

      ...SelectProps,
    };

    return <Component {...SelectProps_arg}></Component>;
  }

  const [Component, position] = Input[positionInForm];

  const InputProps_arg = {
    className:
      "FormPageLayout__input_generic FormPageLayout__input_" + position,

    ...InputProps,
  };

  return (
    <Component {...InputProps_arg}>
      <AdditionalBlocks
        classNameHelper="FormPageLayout__helpblock"
        help={InputProps.help}
        ChageIsShowInfoHelp={InputProps.ChageIsShowInfoHelp}
        classNamePlaceHolder="FormPageLayout__newPlaceHolder"
        onFocus={InputProps.onFocus}
        value={InputProps.value}
        placeholder={InputProps.placeholder}
        IsShowInfoHelp={InputProps.IsShowInfoHelp}
      />
    </Component>
  );
};

export default SelectOrInput;
