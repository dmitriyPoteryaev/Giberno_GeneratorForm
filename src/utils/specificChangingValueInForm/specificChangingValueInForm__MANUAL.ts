import { checkSymbolsInAmountInput } from "../checkSymbolsInAmountInput";

const regex = /^(\d{0,9})(\.\d{0,2})?$/;

export const specificChangingValueInForm__MANUAL = (
  array: any,
  nameInput: string,
  value: any
) => {
  return array.map((elem: any, k: any) => {
    if (elem.name === nameInput) {
      if (nameInput.split("_")[0] === "amount") {
        if (value === "" || regex.test(checkSymbolsInAmountInput(value))) {
          return { ...elem, value: checkSymbolsInAmountInput(value) };
        } else {
          return elem;
        }
      }
      return { ...elem, value: value };
    } else {
      return elem;
    }
  });
};
