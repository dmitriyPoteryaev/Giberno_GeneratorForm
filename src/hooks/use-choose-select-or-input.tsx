import React from "react";

import CustomSelect from "@shared/components/CustomSelect/CustomSelect";
import Input from "@shared/components/Input/Input";
import { MapArrayItemsBySpecificKey } from "@utils/MapArrayItemsBySpecificKey";

export const useChooseSelectOrInput = (
  isopen: any,
  ShowList: any,
  itemListStore: any,
  i: any,
  uniqKey: any,
  mainProps: any,
  arr: any
): any => {
  const LAST_NUMBER: number = arr.length - 1;

  if (typeof isopen === "boolean") {
    const SelectProps = {
      uniqKey: uniqKey,
      ShowList: ShowList,
      isopen: isopen,
      ...mainProps,
    };
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
          ...SelectProps,
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

  const InputProps = {
    uniqKey: uniqKey,
    ...mainProps,
  };

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
