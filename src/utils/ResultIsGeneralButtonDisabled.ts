import { ObjectInputProps } from "../types/formTypes";
/** 
 * Проверяет активна кнопка кнопка или нет. Это будет зависеть:
 * 1) Есть ли после точки в поле с суммой ещё цифры
 * 2) Заполненны ли все обязательные поля (IsRequire === true)
 
*/
export const ResultIsGeneralButtonDisabled = (
  arr: ObjectInputProps[],
  ObjectWithInfoEmailInputStore: ObjectInputProps
) => {
  return (
    [...arr, ObjectWithInfoEmailInputStore].reduce(
      (accum: any, elem: ObjectInputProps) => {
        if (!elem.IsRequire) {
          return accum;
        } else {
          return accum || !elem.value.trim();
        }
      },
      false
    ) ||
    (arr
      ?.find((elem: ObjectInputProps) => elem?.placeholder === "Сумма")
      ?.value?.split(".")[1]
      ?.split("")?.length === 0 &&
      arr
        .find((elem: ObjectInputProps) => elem.placeholder === "Сумма")
        ?.value?.includes("."))
  );
};
