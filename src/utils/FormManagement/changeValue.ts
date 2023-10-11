import { specificChangingValueInForm__LIST } from "@utils/specificChangingValueInForm/specificChangingValueInForm__LIST";
import { specificChangingValueInForm__MANUAL } from "@utils/specificChangingValueInForm/specificChangingValueInForm__MANUAL";
import { specificChangingValueInForm__MANUAL_LIST } from "@utils/specificChangingValueInForm/specificChangingValueInForm__MANUAL_LIST";

export const changeValue = (
  arr: any,
  name: any,
  event: any,
  positionType: string,
  itemList: any
) => {
  switch (positionType) {
    case "MANUAL":
      return specificChangingValueInForm__MANUAL(arr, name, event);
    case "LIST":
      return specificChangingValueInForm__LIST(arr, itemList, name, event);
    case "MANUAL_LIST":
      return specificChangingValueInForm__MANUAL_LIST(
        arr,
        itemList,
        name,
        event
      );

    default:
      return specificChangingValueInForm__MANUAL(arr, name, event);
  }
};
