const regex = /^(\d{0,9})(\.\d{0,2})?$/;
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
