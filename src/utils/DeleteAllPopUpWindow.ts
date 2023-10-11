export const DeleteAllPopUpWindow = (value: any) => {
  if (Array.isArray(value)) {
    if (
      value.some((elem: any) => elem.IsShowInfoHelp === true) ||
      value.some((elem: any) => elem.isopen === true)
    ) {
      return value.map((elem: any, i: number) => {
        if (elem.hasOwnProperty("isopen") && typeof elem.isopen === "boolean") {
          return { ...elem, isopen: false, IsShowInfoHelp: false };
        }
        return { ...elem, IsShowInfoHelp: false };
      });
    } else {
      return value;
    }
  } else {
    if (value?.IsShowInfoHelp) {
    } else {
      return value;
    }
  }
  // if (
  //   ObjectWithInfoEmailInputStore?.IsShowInfoHelp ||
  //   ArrayWithAllInputsStore.some((elem: any) => elem.IsShowInfoHelp === true) ||
  //   ArrayWithAllInputsStore.some((elem: any) => elem.isopen === true)
  // ) {
  //   return {
  //     NEWArrayWithAllInputsStore: ArrayWithAllInputsStore.map(
  //       (elem: any, i: number) => {
  //         if (
  //           elem.hasOwnProperty("isopen") &&
  //           typeof elem.isopen === "boolean"
  //         ) {
  //           return { ...elem, isopen: false, IsShowInfoHelp: false };
  //         }
  //         return { ...elem, IsShowInfoHelp: false };
  //       }
  //     ),
  //     NEWObjectWithInfoEmailInputStore: {
  //       ...ObjectWithInfoEmailInputStore,
  //     },
  //   };
  // } else {
  //   return {
  //     NEWArrayWithAllInputsStore: ArrayWithAllInputsStore,
  //     NEWObjectWithInfoEmailInputStore: ObjectWithInfoEmailInputStore,
  //   };
  // }
};
