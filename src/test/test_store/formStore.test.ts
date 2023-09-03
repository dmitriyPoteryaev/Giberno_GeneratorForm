import { positionType } from "./../../types/formTypes";
import { FormStore } from "@store/form";
import { RootFormStore } from "@store/rootForm";
import { formAPI } from "@api/getInfoAboutForm";
import axios from "axios";
const { getInfoAboutForm } = formAPI;

// jest.mock("@store/form");

jest.mock("axios");

describe("MyClass", () => {
  let formStore: any;
  let rootStore: any;

  let MockResponse: any;

  beforeEach(() => {
    jest.clearAllMocks();
    rootStore = new RootFormStore();
    formStore = new FormStore();
    // formStore.__proto__ = rootStore;

    MockResponse = {
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

    // MockResponse = {
    //   ArrayWithFormInputs: [
    //     {
    //       value: "",
    //       type: "text",
    //       placeholder: true,
    //       help: true,
    //       IsShowInfoHelp: false,
    //       onFocus: false,
    //       IsRequire: true,
    //       IsEnabled: true,
    //       name: "namePos",
    //       isopen: false,
    //     },
    //     {
    //       value: "",
    //       type: "text",
    //       placeholder: "Описание позиции",
    //       help: null,
    //       IsShowInfoHelp: false,
    //       onFocus: false,
    //       IsEnabled: true,
    //       IsRequire: true,
    //       name: "description",
    //       isopen: false,
    //     },
    //     {
    //       value: "",
    //       type: "text",
    //       placeholder: "Сумма",
    //       onFocus: false,
    //       IsRequire: true,
    //       IsEnabled: true,
    //       IsShowInfoHelp: false,
    //       name: "amount",
    //     },
    //   ],
    //   ObjectWithInfoEmailInput: {
    //     value: "",
    //     type: "text",
    //     placeholder: "Email клиента для чека",
    //     help: null,
    //     IsShowInfoHelp: false,
    //     onFocus: false,
    //     IsRequire: true,
    //     IsEnabled: true,
    //     name: "email",
    //     isopen: null,
    //   },

    //   clientId: "d839a0b6-5bae-4e8c-aa33-30b2d8a42b07",
    //   clientTitle: "Сенной рынок",
    //   employee: "496addd6-9d6c-47eb-9295-2fa342f3fc64",
    //   employeeName: "Лобода Д. А.",
    //   itemList: [
    //     {
    //       ItemID: "448116b0-e983-461e-89ba-bba271c57faf",
    //       description: "Красивые цветы",
    //       discount: "ON_EMPLOYEE",
    //       name: "Тюльпаны"
    //     },
    //     {
    //       ItemID: "39797c53-413f-46d2-9838-12553f5179d7",
    //       description: "1 букет",
    //       discount: "PROPORTIONAL",
    //       name: "Ромашки"
    //     }],

    // }
  });

  it("should initialize myBoolean to false", () => {
    expect(formStore.ShowWhatInputIsEmpty).toBe(false);
  });

  it("should toggle myBoolean to true", () => {
    formStore.ChageShowWhatInputIsEmpty(true);
    expect(formStore.ShowWhatInputIsEmpty).toBe(true);
  });

  it("should toggle myBoolean to false", () => {
    formStore.ChageShowWhatInputIsEmpty(false);
    expect(formStore.ShowWhatInputIsEmpty).toBe(false);
  });
  it("root", async () => {
    expect(formStore).toBeInstanceOf(FormStore);
    expect(formStore).toBeInstanceOf(RootFormStore);
    (axios.get as jest.Mock).mockReturnValue(MockResponse);
    try {
      const res = await rootStore.ChangeDataAboutForm(
        "48acf988-686f-4be4-bc36-82bf827c3b61"
      );
    } catch (e) {
      expect(e).toEqual({
        error: "Что пошло не так! Перезагрузите страницу",
      });
    }
    expect(rootStore.positionTypeStore).toBe(
      MockResponse.data.data.positionType
    );

    if (formStore instanceof RootFormStore) {
       formStore.positionTypeStore = rootStore.positionTypeStore

    }
  });
});
