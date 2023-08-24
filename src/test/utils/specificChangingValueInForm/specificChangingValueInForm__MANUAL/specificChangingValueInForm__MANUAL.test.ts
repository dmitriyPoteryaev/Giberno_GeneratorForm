import { specificChangingValueInForm__MANUAL } from "@utils/specificChangingValueInForm/specificChangingValueInForm__MANUAL";

describe("Проверка формы на positionType =  MANUAL", () => {
  const MockArrayWithAllInputsInForm = [
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
      IsEnabled: true,
      IsRequire: true,
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

  test("Mеняем namePos", () => {
    expect(
      specificChangingValueInForm__MANUAL(
        MockArrayWithAllInputsInForm,
        "namePos",
        "1"
      )
    ).toEqual([
      {
        value: "1",
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
        IsEnabled: true,
        IsRequire: true,
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
    ]);
  });
  test("Mеняем description", () => {
    expect(
      specificChangingValueInForm__MANUAL(
        MockArrayWithAllInputsInForm,
        "description",
        "1"
      )
    ).toEqual([
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
        value: "1",
        type: "text",
        placeholder: "",
        help: "",
        IsShowInfoHelp: false,
        onFocus: false,
        IsEnabled: true,
        IsRequire: true,
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
    ]);
  });
  test("Mеняем amount", () => {
    expect(
      specificChangingValueInForm__MANUAL(
        MockArrayWithAllInputsInForm,
        "amount",
        "1"
      )
    ).toEqual([
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
        IsEnabled: true,
        IsRequire: true,
        name: "description",
        isopen: false,
      },
      {
        value: "1",
        type: "text",
        placeholder: "Сумма",
        onFocus: false,
        IsRequire: true,
        IsEnabled: true,
        IsShowInfoHelp: false,
        name: "amount",
      },
    ]);
  });
});
