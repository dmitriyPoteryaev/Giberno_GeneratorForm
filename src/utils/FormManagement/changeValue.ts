import { specificChangingValueInForm__LIST } from "@utils/specificChangingValueInForm/specificChangingValueInForm__LIST";
import { specificChangingValueInForm__MANUAL } from "@utils/specificChangingValueInForm/specificChangingValueInForm__MANUAL";
import { specificChangingValueInForm__MANUAL_LIST } from "@utils/specificChangingValueInForm/specificChangingValueInForm__MANUAL_LIST";

import { itemFromList, ObjectInputProps } from "../../types/formTypes";

/**
 * Функция предназначена для изменения значений в полях формы. Вносить измения нужно по специальному алгориту.
 * То как будут изменяться значения зависит от параметра positionType.
 * @param  {ObjectInputProps[]} arr массив со всей информацией по форме
 * @param  {string} name атрибут name, который отномится к конкретному полю в форме
 * @param  {itemFromList[]} itemList специальный массив, для изменения значений в форме
 *  @param  {string} event значение, которое хочет внести в поле клиент
 *  @return {ObjectInputProps[]}
 */
export const changeValue = (
  arr: ObjectInputProps[],
  name: string,
  event: string,
  positionType: string,
  itemList: itemFromList[]
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
