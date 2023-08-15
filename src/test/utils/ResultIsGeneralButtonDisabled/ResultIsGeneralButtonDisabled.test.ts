import { ResultIsGeneralButtonDisabled } from "../../../utils/ResultIsGeneralButtonDisabled";
import { ObjectInputProps } from "../../../types/formTypes";

describe("Тестирование активности главной кнопки", () => {
  let MockArrayWithFormInputs: ObjectInputProps[] = [
    {
      value: "",
      type: "text",
      placeholder: "",
      help: "",
      IsShowInfoHelp: false,
      onFocus: false,
      IsRequire: true,
      IsEnabled: true,
      name: "namePos",
      isopen: false,
    },
    {
      value: "",
      type: "text",
      placeholder: "",
      help: "",
      IsShowInfoHelp: false,
      onFocus: false,
      IsEnabled: false,
      IsRequire: false,
      name: "description",
      isopen: false,
    },
    {
      value: "",
      type: "text",
      placeholder: "Сумма",
      onFocus: false,
      IsRequire: true,
      IsEnabled: true,
      IsShowInfoHelp: false,
      name: "amount",
    },
  ];
  const MockObjectWithInfoEmailInput: ObjectInputProps = {
    value: "",
    type: "text",
    placeholder: "",
    help: "",
    IsShowInfoHelp: false,
    onFocus: false,
    IsRequire: true,
    IsEnabled: false,
    name: "email",
    isopen: null,
  };

  let counter = 0;

  beforeEach(() => {
    MockArrayWithFormInputs = MockArrayWithFormInputs.map(
      (input: ObjectInputProps, i: number) => {
        if (i === counter) {
          return { ...input, value: "something value" };
        } else {
          return input;
        }
      }
    );

    if (counter === 3) {
      MockObjectWithInfoEmailInput.value = "something value";
    }

    if (counter === 4) {
      MockArrayWithFormInputs = MockArrayWithFormInputs.map(
        (input: ObjectInputProps, i: number) => {
          if (i === 0) {
            return { ...input, value: "", IsRequire: false };
          } else {
            return input;
          }
        }
      );
    }

    if (counter === 5) {
      MockArrayWithFormInputs = MockArrayWithFormInputs.map(
        (input: ObjectInputProps, i: number) => {
          if (input.name === "amount") {
            return { ...input, value: "11." };
          } else {
            return input;
          }
        }
      );
    }
    counter++;
  });

  test("Кнопка неаквтина. В первом инпуте написано какое-то значение. Все поля обязательны", () => {
    expect(
      ResultIsGeneralButtonDisabled(
        MockArrayWithFormInputs,
        MockObjectWithInfoEmailInput
      )
    ).toBe(true);
  });
  test("Кнопка неаквтина. В первых двух инпутах написано какое-то значение. Все поля обязательны ", () => {
    expect(
      ResultIsGeneralButtonDisabled(
        MockArrayWithFormInputs,
        MockObjectWithInfoEmailInput
      )
    ).toBe(true);
  });
  test("Кнопка неаквтина. В первых трёх инпутах написано какое-то значение. Все поля обязательны ", () => {
    expect(
      ResultIsGeneralButtonDisabled(
        MockArrayWithFormInputs,
        MockObjectWithInfoEmailInput
      )
    ).toBe(true);
  });
  test("Кнопка активна. Форма заполнена и в инпут, связанный с e-mail, введено какое-то значение. Все поля обязательны", () => {
    expect(
      ResultIsGeneralButtonDisabled(
        MockArrayWithFormInputs,
        MockObjectWithInfoEmailInput
      )
    ).toBe(false);
  });
  test("Кнопка активна. Форма заполнена и в инпут, связанный с e-mail, введено какое-то значение. Первое поле в форме необязательно и там ничего не введено", () => {
    expect(
      ResultIsGeneralButtonDisabled(
        MockArrayWithFormInputs,
        MockObjectWithInfoEmailInput
      )
    ).toBe(false);
  });
  test("Кнопка не активна. В поле, связаным с кол-ом денег после точки нет никаких цифр", () => {
    expect(
      ResultIsGeneralButtonDisabled(
        MockArrayWithFormInputs,
        MockObjectWithInfoEmailInput
      )
    ).toBe(true);
  });
});
