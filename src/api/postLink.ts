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

  const ChoosePOST_BODY = () => {
    switch (positionTypeStore) {
      case "LIST":
        return {
          items: [
            {
              itemID: itemListStore.find((elem: any) => elem.name === name)
                .ItemID,
              amount: +amount,
              amountAfterDiscount: +discount || 0,
            },
          ],
          employee: employee, //Обязательный параметр
          client_id: client_id, //Обязательный параметр
          keyGen: keyGen, //Обязательный параметр
          emailCustomer: emailCustomer,
        };
      case "MANUAL_LIST":
        return {
          items: [
            {
              itemID: itemListStore.find((elem: any) => elem.name === name)
                .ItemID,
              description: description,
              amount: +amount,
              amountAfterDiscount: +discount || 0,
            },
          ],
          employee: employee, //Обязательный параметр
          client_id: client_id, //Обязательный параметр
          keyGen: keyGen, //Обязательный параметр
          emailCustomer: emailCustomer,
        };
      default:
        return {
          items: [
            {
              name: name, //Обязательный параметр
              description: description,
              amount: +amount, //Обязательный параметр
            },
          ],
          employee: employee, //Обязательный параметр
          client_id: client_id, //Обязательный параметр
          keyGen: keyGen, //Обязательный параметр
          emailCustomer: emailCustomer,
        };
    }
  };

  let POST_BODY = ChoosePOST_BODY();

  return axios
    .post(`https://api.giberno.ru/api/webhook/orders/`, POST_BODY)
    .then((response: any) => {
      if (response.status !== 200) {
        if (response?.data?.result?.[0]) {
          throw Error(response?.data?.result?.[0]);
        }
        if (response?.data?.result?.error_message?.[0]) {
          throw Error(response?.data?.result?.error_message?.[0]);
        } else {
          throw Error("Что пошло не так! Попробуйте ввести данные заново");
        }
      }

      if (typeof response.data !== "object") {
        throw Error("Что пошло не так! Попробуйте ввести данные заново");
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
