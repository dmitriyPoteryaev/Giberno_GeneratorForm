import { checkSymbolsInAmountInput } from "@utils/checkSymbolsInAmountInput";

describe("Проверка значения суммы", () => {
  test("Передаём значение 2 300,4 RUB", () => {
    expect(checkSymbolsInAmountInput("2 300,4 RUB")).toBe("2300.4");
  });
  test("Передаём значение 5 000 000,04 USD", () => {
    expect(checkSymbolsInAmountInput("5 000 000,04 USD")).toBe("5000000.04");
  });
  test("Клиент вводит первые 00. Вместо этого в форме появится - 0.", () => {
    expect(checkSymbolsInAmountInput("00")).toBe("0.");
  });
});
