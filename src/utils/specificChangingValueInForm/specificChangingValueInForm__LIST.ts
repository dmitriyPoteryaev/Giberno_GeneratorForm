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

export const specificChangingValueInForm__LIST = (
  array: any,
  arrayWithItems: any,
  nameInput: string,
  value: string
) => {
  if (nameInput === "description") {
    return array;
  }

  if (nameInput === "namePos") {
    // ЛОГИКА, СВЯЗАННАЯ  С ДОБАВЛЕНИЕМ НОВОГО ИНПУТА С УЧЁТОМ ТИПА СКИДКИ

    const ObjectWithChosedItem = arrayWithItems.find(
      (elem: any) => elem.name === value
    );
    if (!ObjectWithChosedItem) {
      return array;
    }

    const { description, discount }: any = ObjectWithChosedItem;

    const ObjectAmountDiscount = array.find(
      (elem: any) => elem.name === "amount_discount"
    );

    if (!ObjectAmountDiscount && discount !== "NO_DISCOUNT") {
      array = [...array, { ...InputWithDiccount, discount: discount }];
    }
    if (ObjectAmountDiscount && ObjectAmountDiscount.discount !== discount) {
      const index = array.indexOf(
        (elem: any) => elem.name === "amount_discount"
      );
      array.splice(index, 1);
      if (discount !== "NO_DISCOUNT") {
        array = [...array, { ...InputWithDiccount, discount: discount }];
      }
    }

    // ЗДЕСЬ ЛОГИКА, СВЯЗАННАЯ С ДОБАВЛЕНИЕМ НОВОГО ИНПУТА ЗАКАНЧИВАЕТСЯ

    return array.map((elem: any, k: any) => {
      if (elem.name === "namePos") {
        return { ...elem, value: value };
      }
      if (elem.name === "description") {
        return { ...elem, value: description };
      } else {
        return elem;
      }
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
