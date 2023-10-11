import axios from "axios";

import { ObjectInputProps, responseForm } from "../types/formTypes";

const getInfoAboutForm = async (key_gen: string) => {
  try {
    const controller = new AbortController();
    const response = await axios.get(`https://api.giberno.ru/test/formgen/`, {
      params: {
        key_gen: key_gen,
      },
      signal: controller.signal,
    });

    if (response.status !== 200) {
      throw Error("Что пошло не так! Перезагрузите страницу");
    }
    const {
      employeeName,
      employee,
      clientId,
      clientTitle,
      keyGen,
      email,
      itemDescription,
      itemName,
      positionType,
      itemList,
    }: responseForm = response.data.data;

    const ArrayWithFormInputs: ObjectInputProps[] = [
      {
        value: "",
        type: "text",
        placeholder: itemName.itemNamePlaceholder,
        help: itemName.itemNameHelp,
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
        placeholder: itemDescription.itemDescriptionPlaceholder,
        help: itemDescription.itemDescriptionHelp,
        IsShowInfoHelp: false,
        onFocus: false,
        IsEnabled: itemDescription.enabled,
        IsRequire: itemDescription.descriptionRequire,
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

    if (
      Array.isArray(itemList) &&
      (positionType === "LIST" || positionType === "MANUAL_LIST")
    ) {
      ArrayWithFormInputs[0].isopen = false;
    } else {
      ArrayWithFormInputs[0].isopen = undefined;
    }

    if (Array.isArray(itemList) && positionType === "LIST") {
      ArrayWithFormInputs[1].isopen = false;
    } else {
      ArrayWithFormInputs[1].isopen = undefined;
    }

    const ObjectWithInfoEmailInput = {
      value: "",
      type: "text",
      placeholder: email.emailPlaceholder,
      help: email.emailHelp,
      IsShowInfoHelp: false,
      onFocus: false,
      IsRequire: email.emailRequire,
      IsEnabled: email.enabled,
      name: "email",
      isopen: null,
    };

    return {
      ArrayWithFormInputs: ArrayWithFormInputs,
      ObjectWithInfoEmailInput: ObjectWithInfoEmailInput,
      employeeName: employeeName,
      employee: employee,
      clientId: clientId,
      clientTitle: clientTitle,
      keyGen: keyGen,
      positionType: positionType,
      itemList: itemList,
    };
  } catch (err: any) {
    return err.message;
  }
};

export const formAPI = {
  getInfoAboutForm,
};
