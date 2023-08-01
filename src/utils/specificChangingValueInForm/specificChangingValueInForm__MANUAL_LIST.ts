import { changeSomePositionInArray } from "../changeSomePositionInArray";
import { checkSymbolsInAmountInput } from "../checkSymbolsInAmountInput";
const regex = /^(\d{0,9})(\.\d{0,2})?$/;

const InputWithDiccount = {
  value: "",
  type: "text",
  placeholder: "Цена после скидки",
  onFocus: false,
  IsEnabled: true,
  IsRequire: true,
  name: "amount_discount",
};

export const specificChangingValueInForm__MANUAL_LIST = (
  array: any,
  arrayWithItems: any,
  nameInput: string,
  value: any
) => {
  if (nameInput === "namePos") {
    // ЛОГИКА, СВЯЗАННАЯ  С ДОБАВЛЕНИЕМ НОВОГО ИНПУТА С УЧЁТОМ ТИПА СКИДКИ

    const discount = arrayWithItems.find(
      (elem: any) => elem.name === value
    ).discount;

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

    // ЗДЕСЬ ЛОГИКА, СВЯЗАННАЯ С ДОБАВЛЕНИЕМ НОВОГО ИНПУТА ЗАКАНЧИВАЕТСЯ

    return array.map((elem: any, k: any) => {
      if (elem.name === "namePos") {
        return { ...elem, value: value };
      }
      return elem;
    });
  }

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
