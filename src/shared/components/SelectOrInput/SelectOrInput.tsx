import React from "react";

import CustomInput from "@shared/components/CustomInput/CustomInput";
import { MapArrayItemsBySpecificKey } from "@utils/MapArrayItemsBySpecificKey";

import CustomSelect from "../CustomSelect/CustomSelect";

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
  const { isopen, SelectProps, InputProps, LAST_NUMBER, itemListStore, i } =
    props;

  const positionInForm =
    i === 0 ? "first" : i === LAST_NUMBER ? "last" : "nested";

  if (typeof isopen === "boolean") {
    const [Component, position, title] = Select[positionInForm];
    const SelectProps_arg = {
      className: "Formpagelayout__select_" + position,
      actualPositionsStore: MapArrayItemsBySpecificKey(itemListStore, title),
      ...SelectProps,
    };

    return <Component {...SelectProps_arg} />;
  }

  const [Component, position] = Input[positionInForm];

  const InputProps_arg = {
    className: "Formpagelayout__input_" + position,
    ...InputProps,
  };

  return <Component {...InputProps_arg} />;
};

export default SelectOrInput;
