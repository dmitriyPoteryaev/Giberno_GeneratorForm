import axios from "axios";

const getInfoAboutForm = (key_gen: string) => {
  // return new Promise<any>((resolve, reject) =>
  //   // "https://api.giberno.ru/invoice/?form_pay=497f6eca-6276-4993-bfeb-53cbbbba6f08"
  //   setTimeout(() => {
  //     const keyGen = "8fe86f19-9477-4e73-b198-d08d4e33be6c";
  //     const employee = "496addd6-9d6c-47eb-9295-2fa342f3fc64";
  //     const employeeName = "Лобода Д. А.";
  //     const clientId = "d839a0b6-5bae-4e8c-aa33-30b2d8a42b07";
  //     const clientTitle = "Сенной рынок";
  //     const actualPositions = [
  //       "Сенной рынок",
  //       "Здесь",
  //       "что-то",
  //       "но",
  //       "не то",
  //       "что",
  //       "нужно",
  //     ];

  //     const ArrayWithFormInputs: any = [
  //       {
  //         value: "",
  //         type: "text",
  //         placeholder: "Название позиции",
  //         help: "ОАО СБЕРБАНК",
  //         IsShowInfoHelp: false,
  //         onFocus: false,
  //         IsRequire: true,
  //         name: "name_pos",
  //         isopen: "",
  //       },
  //       {
  //         value: "",
  //         type: "text",
  //         placeholder: "Описание позиции",
  //         help: "lol",
  //         IsShowInfoHelp: false,
  //         onFocus: false,
  //         IsEnabled: true,
  //         IsRequire: true,
  //         name: "description",
  //       },
  //       {
  //         value: "",
  //         type: "text",
  //         placeholder: "Сумма",
  //         onFocus: false,
  //         IsRequire: true,
  //         IsShowInfoHelp: false,
  //         name: "amount",
  //       },
  //     ].filter((CurrentInput: any, i: any) => {
  //       if (!CurrentInput.IsEnabled && i === 1) {
  //         return;
  //       } else {
  //         return CurrentInput;
  //       }
  //     });
  //     if (Array.isArray(actualPositions)) {
  //       ArrayWithFormInputs[0].isopen = false;
  //     } else {
  //       ArrayWithFormInputs[0].isopen = null;
  //     }
  //     const ObjectWithInfoEmailInput = {
  //       value: "",
  //       type: "text",
  //       placeholder: "Введите ваш e-mail",
  //       help: "fsfewfwefwefwefwefwe",
  //       IsShowInfoHelp: false,
  //       onFocus: false,
  //       IsRequire: true,
  //       IsEnabled: true,
  //       name: "email",
  //     };

  //     resolve({
  //       ArrayWithFormInputs: ArrayWithFormInputs,
  //       ObjectWithInfoEmailInput: ObjectWithInfoEmailInput,
  //       employeeName: employeeName,
  //       employee: employee,
  //       clientId: clientId,
  //       clientTitle: clientTitle,
  //       keyGen: keyGen,
  //       actualPositions: actualPositions,
  //     });
  //   }, 1000)
  // );
  return axios
    .get(`https://api.giberno.ru/test/formgen/`, {
      params: {
        key_gen: key_gen,
      },
    })
    .then((response: any) => {
      if (response.status !== 200) {
        return "Что пошло не так! Перезагрузите страницу";
      }
      return {
        config: response.config.params,
        infoForm: response.data.data,
      };
    })
    .then(({ config, infoForm }: any) => {
      const {
        employeeName,
        employee,
        clientId,
        clientTitle,
        keyGen,
        email,
        itemDescription,
        itemName,
        actualPositions,
        positionType,
        itemList,
      } = infoForm;

      // const itemList = typeof itemList === "undefined" ? itemList : [];

      const ArrayWithFormInputs: any = [
        {
          value: "",
          type: "text",
          placeholder: itemName.itemNamePlaceholder,
          help: itemName.itemNameHelp,
          IsShowInfoHelp: false,
          onFocus: false,
          IsRequire: true,
          name: "name_pos",
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
        },
        {
          value: "",
          type: "text",
          placeholder: "Сумма",
          onFocus: false,
          IsRequire: true,
          IsShowInfoHelp: false,
          name: "amount",
        },
      ];

      if (Array.isArray(actualPositions)) {
        ArrayWithFormInputs[0].isopen = false;
      } else {
        ArrayWithFormInputs[0].isopen = null;
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
    })
    .catch((err) => {
      return err.message;
    });
};

export const formAPI = {
  getInfoAboutForm,
};
