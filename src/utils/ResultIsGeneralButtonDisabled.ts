export const ResultIsGeneralButtonDisabled = (
  arr: any,
  ObjectWithInfoEmailInputStore: any
) => {
  return (
    [...arr, ObjectWithInfoEmailInputStore].reduce((accum: any, elem: any) => {
      if (!elem.IsRequire) {
        return accum;
      } else {
        return accum || !elem.value.trim();
      }
    }, false) ||
    (arr
      ?.find((elem: any) => elem?.placeholder === "Сумма")
      ?.value?.split(".")[1]
      ?.split("")?.length === 0 &&
      arr
        .find((elem: any) => elem.placeholder === "Сумма")
        ?.value?.includes("."))
  );
};
