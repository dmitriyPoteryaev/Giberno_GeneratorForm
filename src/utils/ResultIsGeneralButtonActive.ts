export const ResultIsGeneralButtonActive = (
  arr: any,
  ObjectWithInfoEmailInputStore: any
) => {
  if (arr[1].IsRequire || !ObjectWithInfoEmailInputStore.IsRequire) {
    return (
      arr
        .map((elem: any, i: any) => {
          if (!arr.IsRequire && i === 1) {
            return "Not empty";
          } else {
            return elem.value;
          }
        })
        .some((elem: any, i: any) => !elem.trim()) ||
      (!ObjectWithInfoEmailInputStore.IsRequire
        ? false
        : !ObjectWithInfoEmailInputStore.value.trim())
    );
  }
  return (
    arr.map((elem: any) => elem.value).some((elem: any) => !elem.trim()) ||
    !ObjectWithInfoEmailInputStore.value.trim()
  );
};
