import { checkSymbolsInAmountInput } from "./checkSymbolsInAmountInput";
const regex = /^(\d{0,9})(\.\d{0,2})?$/;

export const changeSomePositionInArray = (
  array: any,
  name: string,
  value: any,
  ...rest: any
) => {
  if (Array.isArray(value)) {
    const [valueName, valueDesc]: any = value;

    const [namePosInput, decsInput]: any = rest;

    return array.map((elem: any, k: any) => {
      if (elem.name === namePosInput) {
        return { ...elem, [name]: valueName };
      }
      if (elem.name === decsInput) {
        return { ...elem, [name]: valueDesc };
      } else {
        return elem;
      }
    });
  }

  const nameInput: any = rest[0];

  return array.map((elem: any, k: any) => {
    if (elem.name === nameInput) {
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
