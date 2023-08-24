import { specificChangingValueInForm__MANUAL_LIST } from "@utils/specificChangingValueInForm/specificChangingValueInForm__MANUAL_LIST";

describe("Проверка формы на positionType =  MANUAL_LIST", () => {
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
  const itemList = [
    {
      ItemID: "35860c6d-69f7-4a9e-90ab-bfe20fbe0818",
      discount: "NO_DISCOUNT",
      name: "Сбер ипотека",
    },
    {
      ItemID: "ca306ff3-17e2-44d3-904d-0aae06f1f2fb",
      discount: "PROPORTIONAL",
      name: "Страхование авто",
    },
    {
      ItemID: "c0a3d1a3-7bc0-457f-9c67-548b89f9eb7a",
      discount: "ON_EMPLOYEE",
      name: "Страхование имущества",
    },
  ];

  test("Mеняем namePos. Discount = ON_EMPLOYEE", () => {
    expect(
      specificChangingValueInForm__MANUAL_LIST(
        MockArrayWithAllInputsInForm,
        itemList,
        "namePos",
        "Страхование имущества"
      )
    ).toEqual([
      {
        value: "Страхование имущества",
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
      {
        value: "",
        type: "text",
        placeholder: "Цена после скидки",
        onFocus: false,
        IsEnabled: true,
        IsRequire: true,
        name: "amount_discount",
        discount: "ON_EMPLOYEE",
      },
    ]);
  });
  test("Mеняем description", () => {
    expect(
      specificChangingValueInForm__MANUAL_LIST(
        MockArrayWithAllInputsInForm,
        itemList,
        "description",
        "Тест"
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
        value: "Тест",
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
  test("Mеняем namePos. Discount = NO_DISCOUNT", () => {
    expect(
      specificChangingValueInForm__MANUAL_LIST(
        MockArrayWithAllInputsInForm,
        itemList,
        "namePos",
        "Сбер ипотека"
      )
    ).toEqual([
      {
        value: "Сбер ипотека",
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
  test("Mеняем amount", () => {
    expect(
      specificChangingValueInForm__MANUAL_LIST(
        MockArrayWithAllInputsInForm,
        itemList,
        "amount",
        "1000 000,09 RUB"
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
        value: "1000000.09",
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
  test("Mеняем amount. Вводим некорректное значение", () => {
    expect(
      specificChangingValueInForm__MANUAL_LIST(
        MockArrayWithAllInputsInForm,
        itemList,
        "amount",
        "Какое-то значение "
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
});
