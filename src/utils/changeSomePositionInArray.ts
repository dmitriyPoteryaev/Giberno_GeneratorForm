import { checkSymbolsInAmountInput } from "./checkSymbolsInAmountInput";
const regex = /^(\d{0,9})(\.\d{0,2})?$/;

export const changeSomePositionInArray = (
  array: any,
  name: string,
  value: any,
  placeholder: string,
  ...rest: any
) => {
  const nameInput: any = rest[0];

  return array.map((elem: any, k: any) => {
    if (elem.placeholder === placeholder) {
      if (nameInput === "amount") {
        if (value === "" || regex.test(checkSymbolsInAmountInput(value))) {
          return { ...elem, [name]: checkSymbolsInAmountInput(value) };
        } else {
          return elem;
        }
      }
      return { ...elem, [name]: value };
    } else {
      return elem;
    }
  });
};
