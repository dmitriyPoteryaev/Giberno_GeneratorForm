import { qrLinkStore } from "@store/index";
import axios from "axios";

//api.giberno.ru/invoice_qr/?client_id=fb1969e9-8fa1-4b40-a9a4-da10a3fd968e&key_form=c5c5f096-15b4-4abd-b770-b7379500501a
const postLink = (
  employee: any,
  client_id: any,
  keyGen: any,
  emailCustomer: any,
  amount: any,
  name: any,
  description: any
) => {
  const { ChangeisLoadingQr_Link } = qrLinkStore;
  ChangeisLoadingQr_Link();
  return new Promise<any>((resolve, reject) =>
    // "https://api.giberno.ru/invoice/?form_pay=497f6eca-6276-4993-bfeb-53cbbbba6f08"
    setTimeout(() => {
      resolve({
        employee: "a379a4b4-8cd6-4abd-8f9b-a7679e683a54",
        client_id: "4ca92167-9c15-4c26-8b7f-9df30cafef67",
        keyGen: "8fe86f19-9477-4e73-b198-d08d4e33be6c",
        urlFormPay:
          "https://qr.giberno.ru/formpay?client_id=fb1969e9-8fa1-4b40-a9a4-da10a3fd968e&key_form=1ac3749a-d27e-4133-b422-f6f15cd42e97",
        urlQR:
          "https://stage.giberno.ru:20000/media/invoce_spb_payment_qr_code/invoice_sbp_qr_code_30qr.png",
      });
    }, 1000)
  );
  // return axios
  //   .post(`https://api.giberno.ru/api/webhook/orders/`, {
  //     employee: "a379a4b4-8cd6-4abd-8f9b-a7679e683a54", //Обязательный параметр
  //     client_id: "4ca92167-9c15-4c26-8b7f-9df30cafef67", //Обязательный параметр
  //     keyGen: "8fe86f19-9477-4e73-b198-d08d4e33be6c", //Обязательный параметр
  //     emailCustomer: "vasya@yandex.ru",
  //     items: [
  //       {
  //         name: "Ипотека СБЕР: Жизнь", //Обязательный параметр
  //         description: "ID договора 23000IPA9960056693",
  //         amount: 424.09, //Обязательный параметр
  //       },
  //     ],
  //   })
  //   .then((response: any) => {
  //     if (response.status !== 200) {
  //       throw Error("Что пошло не так! Перезагрузите страницу");
  //     }
  //     console.log(response);
  //     return {
  //       config: response.config.params,
  //       infoQrLink: response.data,
  //     };
  //   })
  //   .catch((err) => {
  //     return err.message;
  //   });
};

export const qrLinkAPI = {
  postLink,
};
