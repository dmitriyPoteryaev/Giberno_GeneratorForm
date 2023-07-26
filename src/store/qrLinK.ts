import { qrLinkAPI } from "@api/postLink";
import { makeAutoObservable } from "mobx";

const { postLink } = qrLinkAPI;

// ВСЁ ЧТО НАЧИНАЕТСЯ НА GET - ЭТО ПРОСТО ВЗЯТЬ ЗНАЧЕНИЕ
// ВСЁ ЧТО НАЧИНАЕТСЯ НА CHANGE - ЭТО ИЗМЕНИТЬ ЭТО ЗНАЧЕНИЕ
class QrLinktsStore {
  CurHeight: any = 0;

  isLoadingQr_Link: any = true;

  Error_QrLink: any;

  qrLinkStore: any;

  urlFormPayStore: any;

  constructor() {
    makeAutoObservable(this);
  }

  postQr_Link = (
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
    return postLink(
      employee,
      client_id,
      keyGen,
      emailCustomer,
      amount,
      name,
      description,
      positionTypeStore,
      itemListStore,
      discount
    )
      .then((infoQrLink: any) => {
        if (typeof infoQrLink !== "object") {
          throw Error(infoQrLink);
        }

        this.qrLinkStore = infoQrLink?.urlQR;
        this.urlFormPayStore = infoQrLink?.urlFormPay;
      })
      .catch((mesError) => {
        alert(`${mesError.message}`);
      })
      .finally(() => (this.isLoadingQr_Link = false));
  };
  // НЕЗАВИСИМЫЕ ПАРАМЕТРЫ
  get getIsLoadingQr_Link() {
    return this.isLoadingQr_Link;
  }

  get getqrLinkStore() {
    return this.qrLinkStore;
  }
  get geturlFormPayStore() {
    return this.urlFormPayStore;
  }

  ChangeisLoadingQr_Link = (value: any) => {
    return (this.isLoadingQr_Link = value);
  };
}

export { QrLinktsStore };
