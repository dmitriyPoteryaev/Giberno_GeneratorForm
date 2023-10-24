export const changeVisualValue = (
  arr: any,
  position: number,
  value: any,
  namePos: any
) => {
  // const clearArr = arr.map((input: any, k: number) => {
  //   if (input[namePos] === true) {
  //     return { ...input, isopen: false };
  //   } else {
  //     return { ...input };
  //   }
  // });

  return arr.map((input: any, k: number) => {
    if (k !== position && input.isopen === true) {
      return { ...input, isopen: false };
    }
    if (k !== position && input.IsShowInfoHelp === true) {
      return { ...input, IsShowInfoHelp: false };
    }
    if (k === position) {
      return { ...input, [namePos]: value };
    } else {
      return input;
    }
  });
};
