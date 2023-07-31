import { qrLinkStore } from "@store/index";
import axios from "axios";

const postLink = (
  employee: any,
  client_id: any,
  keyGen: any,
  emailCustomer: any,
  amount: any,
  name: any,
  description: any,
  positionTypeStore: any,
  itemListStore: any,
  discount: any
) => {
  const { ChangeisLoadingQr_Link } = qrLinkStore;
  ChangeisLoadingQr_Link(true);

  let POST_BODY;
  if (positionTypeStore === "MANUAL") {
    POST_BODY = {
      employee: employee, //Обязательный параметр
      client_id: client_id, //Обязательный параметр
      keyGen: keyGen, //Обязательный параметр
      emailCustomer: emailCustomer,
      items: [
        {
          name: name, //Обязательный параметр
          description: description,
          amount: +amount, //Обязательный параметр
        },
      ],
    };
  } else {
    POST_BODY = {
      employee: employee, //Обязательный параметр
      client_id: client_id, //Обязательный параметр
      keyGen: keyGen, //Обязательный параметр
      emailCustomer: emailCustomer,
      items: [
        {
          itemID: itemListStore.find((elem: any) => elem.name === name).ItemID,
          amount: +amount,
          amountAfterDiscount: +discount || "",
        },
      ],
    };
  }

  // return new Promise<any>((resolve, reject) =>
  //   // "https://api.giberno.ru/invoice/?form_pay=497f6eca-6276-4993-bfeb-53cbbbba6f08"
  //   setTimeout(() => {
  //     resolve({
  //       employee: "a379a4b4-8cd6-4abd-8f9b-a7679e683a54",
  //       client_id: "4ca92167-9c15-4c26-8b7f-9df30cafef67",
  //       keyGen: "8fe86f19-9477-4e73-b198-d08d4e33be6c",
  //       urlFormPay:
  //         "https://qr.giberno.ru/formpay?client_id=fb1969e9-8fa1-4b40-a9a4-da10a3fd968e&key_form=1ac3749a-d27e-4133-b422-f6f15cd42e97",
  //       urlQR:
  //         "https://stage.giberno.ru:20000/media/invoce_spb_payment_qr_code/invoice_sbp_qr_code_30qr.png",
  //     });
  //   }, 1000)
  // );
  return axios
    .post(`https://stage.giberno.ru:20000/test/api/webhook/orders/`, POST_BODY)
    .then((response: any) => {
      if (response.status !== 200) {
        throw Error("Что пошло не так! Перезагрузите страницу");
      }
      return response.data.result;
    })
    .catch((err) => {
      return err.message;
    });
};

export const qrLinkAPI = {
  postLink,
};
