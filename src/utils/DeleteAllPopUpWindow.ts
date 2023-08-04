export const DeleteAllPopUpWindow = (
  ArrayWithAllInputsStore: any,
  ObjectWithInfoEmailInputStore: any
) => {
  if (
    ObjectWithInfoEmailInputStore.IsShowInfoHelp ||
    ArrayWithAllInputsStore.some((elem: any) => elem.IsShowInfoHelp === true) ||
    ArrayWithAllInputsStore.some((elem: any) => elem.isopen === true)
  ) {
    return {
      NEWArrayWithAllInputsStore: ArrayWithAllInputsStore.map(
        (elem: any, i: number) => {
          if (
            elem.hasOwnProperty("isopen") &&
            typeof elem.isopen === "boolean"
          ) {
            return { ...elem, isopen: false, IsShowInfoHelp: false };
          }
          return { ...elem, IsShowInfoHelp: false };
        }
      ),
      NEWObjectWithInfoEmailInputStore: {
        ...ObjectWithInfoEmailInputStore,
        IsShowInfoHelp: false,
      },
    };
  } else {
    return {
      NEWArrayWithAllInputsStore: ArrayWithAllInputsStore,
      NEWObjectWithInfoEmailInputStore: ObjectWithInfoEmailInputStore,
    };
  }
};
