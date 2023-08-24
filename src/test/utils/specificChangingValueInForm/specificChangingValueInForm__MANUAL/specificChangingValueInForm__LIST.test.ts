import { specificChangingValueInForm__LIST } from "@utils/specificChangingValueInForm/specificChangingValueInForm__LIST";

describe("Проверка формы на positionType =  LIST", () => {
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
      ItemID: "448116b0-e983-461e-89ba-bba271c57faf",
      name: "Тюльпаны",
      description: "Красивые цветы",
      discount: "ON_EMPLOYEE",
    },
    {
      ItemID: "39797c53-413f-46d2-9838-12553f5179d7",
      name: "Ромашки",
      description: "1 букет",
      discount: "PROPORTIONAL",
    },
  ];

  test("Mеняем namePos", () => {
    expect(
      specificChangingValueInForm__LIST(
        MockArrayWithAllInputsInForm,
        itemList,
        "namePos",
        "Тюльпаны"
      )
    ).toEqual([
      {
        value: "Тюльпаны",
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
        value: "Красивые цветы",
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
      specificChangingValueInForm__LIST(
        MockArrayWithAllInputsInForm,
        itemList,
        "description",
        "Тюльпаны"
      )
    ).toEqual(MockArrayWithAllInputsInForm);
  });
  test("Mеняем amount. Вводим неверное значение", () => {
    expect(
      specificChangingValueInForm__LIST(
        MockArrayWithAllInputsInForm,
        itemList,
        "amount",
        "что-то другое"
      )
    ).toEqual(MockArrayWithAllInputsInForm);
  });
  test("Mеняем amount. Вводим коректное значение", () => {
    expect(
      specificChangingValueInForm__LIST(
        MockArrayWithAllInputsInForm,
        itemList,
        "amount",
        "1 100 000,99"
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
        value: "1100000.99",
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
