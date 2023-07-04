import axios from "axios";

const getInfoAboutForm = (key_gen: string) => {
  return axios
    .get(`https://api.giberno.ru/formgen/`, {
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
    .catch((err) => {
      return err.message;
    });

  // return new Promise<any>((resolve, reject) =>
  //   // "https://api.giberno.ru/invoice/?form_pay=497f6eca-6276-4993-bfeb-53cbbbba6f08"
  //   setTimeout(() => {
  //     resolve({
  //       status: "success",
  //       data: {
  //         keyGen: "8fe86f19-9477-4e73-b198-d08d4e33be6c",
  //         employee: "496addd6-9d6c-47eb-9295-2fa342f3fc64",
  //         employeeName: "Лобода Д. А.",
  //         clientId: "fb1969e9-8fa1-4b40-a9a4-da10a3fd968e",
  //         clientTitle: "1",
  //         itemName: {
  //           itemNamePlaceholder: "9",
  //           itemNameHelp: "4",
  //         },
  //         itemDescription: {
  //           enabled: true,
  //           descriptionRequire: true,
  //           itemDescriptionPlaceholder: "5",
  //           itemDescriptionHelp: "6",
  //         },
  //         email: {
  //           enabled: true,
  //           emailRequire: true,
  //           emailPlaceholder: "7",
  //           emailHelp:
  //             "ewijweihfewfwehnfekjlfweknfwelkmnweflkewnmfklewnfklewfnwelknfewlkfewlkwefwe kjwfbjekwbf jfbhewbf webfwebfwef webfuwebfkjewn",
  //         },
  //       },
  //     });
  //   }, 1000)
  // );
};

export const formAPI = {
  getInfoAboutForm,
};
