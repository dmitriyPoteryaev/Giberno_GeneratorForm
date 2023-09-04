import { FormStore } from "@store/form";
import { RootFormStore } from "@store/rootForm";
import { formAPI } from "@api/getInfoAboutForm";
import axios from "axios";
const { getInfoAboutForm } = formAPI;

jest.mock("axios");

describe("Тестирование formStore", () => {
  let rootStore: any;
  let formStore: any;

  const MockResponseOK = {
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

  const MockResponseNotOK = {
    data: {
      status: 500,
    },
  };

  beforeEach(() => {
    // jest.clearAllMocks();
    rootStore = new RootFormStore();
    formStore = new FormStore();
  });

  test("FormStore наследует все свойства и методы RootFormStore", async () => {
    expect(formStore).toBeInstanceOf(FormStore);
    expect(formStore).toBeInstanceOf(RootFormStore);
  });

  test("rootFormStore возвращает моковые данные по ключу - 8fe86f19-9477-4e73-b198-d08d4e33be6c", async () => {
    (axios.get as jest.Mock).mockReturnValue(MockResponseOK);

    await rootStore.ChangeDataAboutForm("8fe86f19-9477-4e73-b198-d08d4e33be6c");

    expect(rootStore.positionTypeStore).toBe(
      MockResponseOK.data.data.positionType
    );
  });

  test("rootFormStore ловим ошибку. Status - 500", async () => {
    (axios.get as jest.Mock).mockReturnValue(MockResponseNotOK);

    const error = await rootStore.ChangeDataAboutForm(
      "8fe86f19-9477-4e73-b198-d08d4e33be6c"
    );

    expect(error).toEqual("Что пошло не так! Перезагрузите страницу");
  });

  afterEach(() => {
    // jest.clearAllMocks();
  });
});
