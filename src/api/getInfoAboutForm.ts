import axios from "axios";

const getInfoAboutForm = (key_gen: string) => {
  // return new Promise<any>((resolve, reject) =>
  //   setTimeout(() => {
  //     const keyGen = "8fe86f19-9477-4e73-b198-d08d4e33be6c";
  //     const employee = "496addd6-9d6c-47eb-9295-2fa342f3fc64";
  //     const employeeName = "Лобода Д. А.";
  //     const clientId = "d839a0b6-5bae-4e8c-aa33-30b2d8a42b07";
  //     const clientTitle = "Сенной рынок";
  //     const itemList = [
  //       {
  //         ItemID: "448116b0-e983-461e-89ba-bba271c57faf",
  //         name: "Тюльпаны",
  //         description: "Красивые цветы",
  //         discount: "ON_EMPLOYEE",
  //       },
  //       {
  //         ItemID: "39797c53-413f-46d2-9838-12553f5179d7",
  //         name: "Ромашки",
  //         description: "1 букет0",
  //         discount: "PROPORTIONAL",
  //       },

  //       {
  //         ItemID: "39797c53-413f-46d2-9838-12553f5179d7",
  //         name: "Ромашки1",
  //         description: "1 букет1",
  //         discount: "PROPORTIONAL",
  //       },

  //       {
  //         ItemID: "39797c53-413f-46d2-9838-12553f5179d7",
  //         name: "Ромашки2",
  //         description: "1 букет2",
  //         discount: "PROPORTIONAL",
  //       },
  //       {
  //         ItemID: "39797c53-413f-46d2-9838-12553f5179d7",
  //         name: "Ромашки3",
  //         description: "1 букет3",
  //         discount: "PROPORTIONAL",
  //       },
  //       {
  //         ItemID: "39797c53-413f-46d2-9838-12553f5179d7",
  //         name: "Ромашки4",
  //         description: "1 букет4",
  //         discount: "PROPORTIONAL",
  //       },
  //       {
  //         ItemID: "39797c53-413f-46d2-9838-12553f5179d7",
  //         name: "Ромашки5",
  //         description: "1 букет5",
  //         discount: "PROPORTIONAL",
  //       },
  //       {
  //         ItemID: "39797c53-413f-46d2-9838-12553f5179d7",
  //         name: "Ромашки6",
  //         description: "1 букет6",
  //         discount: "PROPORTIONAL",
  //       },
  //       {
  //         ItemID: "39797c53-413f-46d2-9838-12553f5179d7",
  //         name: "Ромашки7",
  //         description: "1 букет7",
  //         discount: "PROPORTIONAL",
  //       },
  //       {
  //         ItemID: "39797c53-413f-46d2-9838-12553f5179d7",
  //         name: "Ромашки8",
  //         description: "1 букет8",
  //         discount: "PROPORTIONAL",
  //       },
  //       {
  //         ItemID: "39797c53-413f-46d2-9838-12553f5179d7",
  //         name: "Ромашки9",
  //         description: "1 букет9",
  //         discount: "PROPORTIONAL",
  //       },
  //       {
  //         ItemID: "39797c53-413f-46d2-9838-12553f5179d7",
  //         name: "Ромашки10",
  //         description: "1 букет10",
  //         discount: "PROPORTIONAL",
  //       },
  //     ];

  //     const positionType = "LIST";

  //     const ArrayWithFormInputs: any = [
  //       {
  //         value: "",
  //         type: "text",
  //         placeholder: "Мой плейсхолдер",
  //         help: "help",
  //         IsShowInfoHelp: false,
  //         onFocus: false,
  //         IsRequire: true,
  //         IsEnabled: true,
  //         name: "namePos",
  //         isopen: false,
  //       },
  //       {
  //         value: "",
  //         type: "text",
  //         placeholder: "Твой плейсхолдер",
  //         help: "help",
  //         IsShowInfoHelp: false,
  //         onFocus: false,
  //         IsEnabled: true,
  //         IsRequire: true,
  //         name: "description",
  //         isopen: false,
  //       },
  //       {
  //         value: "",
  //         type: "text",
  //         placeholder: "Сумма",
  //         onFocus: false,
  //         IsRequire: true,
  //         IsEnabled: true,
  //         IsShowInfoHelp: false,
  //         name: "amount",
  //       },
  //     ];
  //     if (
  //       Array.isArray(itemList) &&
  //       (positionType === "LIST" || positionType === "MANUAL_LIST")
  //     ) {
  //       ArrayWithFormInputs[0].isopen = false;
  //     } else {
  //       ArrayWithFormInputs[0].isopen = null;
  //     }

  //     if (Array.isArray(itemList) && positionType === "LIST") {
  //       ArrayWithFormInputs[1].isopen = false;
  //     } else {
  //       ArrayWithFormInputs[1].isopen = null;
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
  //       positionType: positionType,
  //       itemList: itemList,
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
        throw Error("Что пошло не так! Перезагрузите страницу");
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
        ArrayWithFormInputs[0].isopen = null;
      }

      if (Array.isArray(itemList) && positionType === "LIST") {
        ArrayWithFormInputs[1].isopen = false;
      } else {
        ArrayWithFormInputs[1].isopen = null;
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
