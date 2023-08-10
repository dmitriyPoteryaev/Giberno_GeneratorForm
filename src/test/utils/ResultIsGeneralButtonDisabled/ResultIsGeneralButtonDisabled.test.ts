import { ResultIsGeneralButtonDisabled } from "../../../utils/ResultIsGeneralButtonDisabled";

describe("Тестирование активности кнопки", () => {
  const MockArrayWithFormInputs = [
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

  const MockObjectWithInfoEmailInput = {
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

  test("Кнопка неаквтина", () => {
    expect(ResultIsGeneralButtonDisabled(
      MockArrayWithFormInputs,
      MockObjectWithInfoEmailInput
    )).toBe(true)
  });
});
