import React from "react";

import Input from "@shared/components/Input/Input";
import { MapArrayItemsBySpecificKey } from "@utils/MapArrayItemsBySpecificKey";

import CustomSelect from "../CustomSelect/CustomSelect";

const SelectOrInput = (props: any) => {
  const {
    isopen,
    InputOrSelectProps,
    SelectProps,
    InputProps,
    LAST_NUMBER,
    itemListStore,
    i,
  } = props;

  if (typeof isopen === "boolean") {
    switch (i) {
      case 0:
        const SelectProps_First = {
          className: "Formpagelayout__select_first",
          actualPositionsStore: MapArrayItemsBySpecificKey(
            itemListStore,
            "name"
          ),
          ...SelectProps,
        };
        return <CustomSelect {...SelectProps_First} />;
      case LAST_NUMBER:
        const SelectProps_Last = {
          className: "Formpagelayout__select_last",
          ...InputOrSelectProps,
        };
        return <CustomSelect {...SelectProps_Last} />;
      default:
        const SelectProps_Nested = {
          actualPositionsStore: MapArrayItemsBySpecificKey(
            itemListStore,
            "description"
          ),
          ...SelectProps,
        };
        return <CustomSelect {...SelectProps_Nested} />;
    }
  }

  switch (i) {
    case 0:
      const InputProps_First = {
        className: "Formpagelayout__input_first",
        ...InputProps,
      };
      return <Input {...InputProps_First} />;
    case LAST_NUMBER:
      const InputProps_Last = {
        className: "Formpagelayout__input_last",
        ...InputProps,
      };
      return <Input {...InputProps_Last} />;
    default:
      const InputProps_Nested = {
        ...InputProps,
      };
      return <Input {...InputProps_Nested} />;
  }
};

export default SelectOrInput;
