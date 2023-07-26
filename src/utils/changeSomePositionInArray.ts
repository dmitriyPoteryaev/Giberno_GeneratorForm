import { checkSymbolsInAmountInput } from "./checkSymbolsInAmountInput";
const regex = /^(\d{0,9})(\.\d{0,2})?$/;

const InputWithDiccount = {
  value: "",
  type: "text",
  placeholder: "Сумма со скидкой",
  onFocus: false,
  IsEnabled: true,
  IsRequire: true,
  name: "amount_discount",
};

export const changeSomePositionInArray = (
  array: any,
  name: string,
  value: any,
  ...rest: any
) => {
  if (Array.isArray(value) && value.length === 2) {
    const [valueName, valueDesc]: any = value;

    const [namePosInput, decsInput, discount]: any = rest;

    if (!array.find((elem: any) => elem.name === "amount_discount")) {
      if (discount === "ON_EMPLOYEE" || discount === "PROPORTIONAL") {
        array = [...array, { ...InputWithDiccount, discount: discount }];
      }
    }
    if (
      array.find((elem: any) => elem.name === "amount_discount")?.discount !==
        undefined &&
      array.find((elem: any) => elem.name === "amount_discount")?.discount !==
        discount
    ) {
      if (discount === "ON_EMPLOYEE" || discount === "PROPORTIONAL") {
        const index = array.indexOf(
          (elem: any) => elem.name === "amount_discount"
        );
        array.splice(index, 1);

        array = [...array, { ...InputWithDiccount, discount: discount }];
      } else {
        const index = array.indexOf(
          (elem: any) => elem.name === "amount_discount"
        );
        array.splice(index, 1);
      }
    }

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

  if (Array.isArray(value) && value.length === 1) {
    const [valueName]: any = value;

    const [namePosInput, discount]: any = rest;

    if (!array.find((elem: any) => elem.name === "amount_discount")) {
      if (discount === "ON_EMPLOYEE" || discount === "PROPORTIONAL") {
        array = [...array, { ...InputWithDiccount, discount: discount }];
      }
    }
    if (
      array.find((elem: any) => elem.name === "amount_discount")?.discount !==
        undefined &&
      array.find((elem: any) => elem.name === "amount_discount")?.discount !==
        discount
    ) {
      if (discount === "ON_EMPLOYEE" || discount === "PROPORTIONAL") {
        const index = array.indexOf(
          (elem: any) => elem.name === "amount_discount"
        );
        array.splice(index, 1);

        array = [...array, { ...InputWithDiccount, discount: discount }];
      } else {
        const index = array.indexOf(
          (elem: any) => elem.name === "amount_discount"
        );
        array.splice(index, 1);
      }
    }

    return array.map((elem: any, k: any) => {
      if (elem.name === namePosInput) {
        return { ...elem, [name]: valueName };
      } else {
        return elem;
      }
    });
  }

  const nameInput: any = rest[0];

  return array.map((elem: any, k: any) => {
    if (elem.name === nameInput) {
      if (nameInput.split("_")[0] === "amount") {
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
