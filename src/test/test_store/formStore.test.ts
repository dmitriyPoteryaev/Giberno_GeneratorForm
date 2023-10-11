import { formAPI } from "@api/getInfoAboutForm";
import { RootFormStore } from "@store/rootForm";
import axios from "axios";
const { getInfoAboutForm } = formAPI;

// jest.mock("@store/form");

jest.mock("axios");

describe("Тестирование formStore", () => {
  let rootStore: any;

  const Mock = {
    data: {
      data: {
        clientId: "d839a0b6-5bae-4e8c-aa33-30b2d8a42b07",
        clientTitle: "Сенной рынок",
        email: {
          enabled: false,
          emailRequire: false,
          emailPlaceholder: "Email клиента для чека",
          emailHelp: "emailHelp",
        },
        employee: "496addd6-9d6c-47eb-9295-2fa342f3fc64",
        itemName: { itemNamePlaceholder: null, itemNameHelp: null },
        itemDescription: {
          enabled: true,
          descriptionRequire: false,
          itemDescriptionPlaceholder: "Описание позиции",
          itemDescriptionHelp: "lol",
        },
        employeeName: "Лобода Д. А.",
        keyGen: "8fe86f19-9477-4e73-b198-d08d4e33be6c",
        positionType: "LIST",
      },
      status: "success",
    },

    status: 200,
    statusText: "OK",
  };

  // const Mock = {
  //   ArrayWithFormInputs: [
  //     {
  //       IsEnabled: true,
  //       IsRequire: true,
  //       IsShowInfoHelp: false,
  //       help: "Тип страхового полиса (Осаго ФЛ, Ипотека Сбер и т.д)",
  //       isopen: false,
  //       name: "namePos",
  //       onFocus: false,
  //       placeholder: "Тип договора",
  //       type: "text",
  //       value: "",
  //     },
  //     {
  //       IsEnabled: true,
  //       IsRequire: true,
  //       IsShowInfoHelp: false,
  //       help: null,
  //       isopen: undefined,
  //       name: "description",
  //       onFocus: false,
  //       placeholder: "ID договора страхования",
  //       type: "text",
  //       value: "",
  //     },
  //     {
  //       IsEnabled: true,
  //       IsRequire: true,
  //       IsShowInfoHelp: false,
  //       name: "amount",
  //       onFocus: false,
  //       placeholder: "Сумма",
  //       type: "text",
  //       value: "",
  //     },
  //   ],
  //   ObjectWithInfoEmailInput: {
  //     IsEnabled: true,
  //     IsRequire: true,
  //     IsShowInfoHelp: false,
  //     help: "emailHelp",
  //     isopen: null,
  //     name: "email",
  //     onFocus: false,
  //     placeholder: "Email клиента для чека",
  //     type: "text",
  //     value: "",
  //   },
  //   clientId: "2fd076e3-22d4-4a30-923d-31278eb5b5dc",
  //   clientTitle: "СК ВСК",
  //   employee: "86bd0673-0f86-43f9-a5a4-a9907610dc0a",
  //   employeeName: "Егоров Р. ",
  //   itemList: [
  //     {
  //       ItemID: "35860c6d-69f7-4a9e-90ab-bfe20fbe0818",
  //       discount: "NO_DISCOUNT",
  //       name: "Сбер ипотека",
  //     },
  //     {
  //       ItemID: "ca306ff3-17e2-44d3-904d-0aae06f1f2fb",
  //       discount: "PROPORTIONAL",
  //       name: "Страхование авто",
  //     },
  //     {
  //       ItemID: "c0a3d1a3-7bc0-457f-9c67-548b89f9eb7a",
  //       discount: "ON_EMPLOYEE",
  //       name: "Страхование имущества",
  //     },
  //     {
  //       ItemID: "3afbbc66-4922-44ab-8a8a-c2cc84706d3b",
  //       discount: "NO_DISCOUNT",
  //       name: "Страхование жизни",
  //     },
  //   ],
  //   keyGen: "5d60d33f-5251-4b19-8925-56d757a3cb20",
  //   positionType: "MANUAL_LIST",
  // };

  beforeEach(() => {
    // jest.clearAllMocks();
    rootStore = new RootFormStore();
  });

  test("Проверяем налиичие в классе параметра ShowWhatInputIsEmpty. ShowWhatInputIsEmpty = false", () => {
    expect(rootStore.ShowWhatInputIsEmpty).toBe(false);
  });

  test("Меняем значение ShowWhatInputIsEmpty с помощью ChageShowWhatInputIsEmpty. ShowWhatInputIsEmpty = true", () => {
    rootStore.ChageShowWhatInputIsEmpty(true);
    expect(rootStore.ShowWhatInputIsEmpty).toBe(true);
  });

  test("Меняем значение ShowWhatInputIsEmpty с помощью ChageShowWhatInputIsEmpty. ShowWhatInputIsEmpty = false", () => {
    rootStore.ChageShowWhatInputIsEmpty(false);
    expect(rootStore.ShowWhatInputIsEmpty).toBe(false);
  });
});
