export const changeVisualValue = (
  arr: any,
  position: number,
  value: any,
  namePos: any
) => {
  return arr.map((input: any, k: number) => {
    if (k === position) {
      return { ...input, [namePos]: value };
    } else {
      return input;
    }
  });
};
