const regex = /^(\d{0,9})(\.\d{0,2})?$/;
/**
 * Клиент страховая компания. Все параметры на нашей форме генераторе заполняются через "копировать"-"вставить".
 * Данные копируются с их внутренней системы.
 * Сумма может быть в формате - 2 340,00 RUR. Они эту сумму копируют, но в форме на сайте она должна отображаться в формате - 2340.00.
 * Поэтому лишние символы нужно убраить
 */
export const checkSymbolsInAmountInput = (amount: string) => {
  let resultAmount = amount;
  const defaultZeroValue = "0.";
  const MapAmoutStringToArray = resultAmount.split("");

  if (MapAmoutStringToArray[0] === "0" && MapAmoutStringToArray[1] === "0") {
    return defaultZeroValue;
  }
  if (resultAmount === ".") {
    return defaultZeroValue;
  }

  resultAmount = amount
    .split("")
    .reduce((curretStingAmount: any, currentSymbol: any) => {
      if (currentSymbol === ",") {
        return curretStingAmount + ".";
      }
      if (currentSymbol === " ") {
        return curretStingAmount;
      }

      if (regex.test(currentSymbol)) {
        return curretStingAmount + currentSymbol;
      } else {
        return curretStingAmount;
      }
    }, "");

  return resultAmount;
};
