import { qrLinkAPI } from "@api/postLink";
import { makeAutoObservable } from "mobx";

const { postLink } = qrLinkAPI;

// ВСЁ ЧТО НАЧИНАЕТСЯ НА GET - ЭТО ПРОСТО ВЗЯТЬ ЗНАЧЕНИЕ
// ВСЁ ЧТО НАЧИНАЕТСЯ НА CHANGE - ЭТО ИЗМЕНИТЬ ЭТО ЗНАЧЕНИЕ
class QrLinktsStore {
  ErroQrLin: any;
  CurHeight: any = 0;

  isLoadingQr_Link: any = true;

  ErroQrLink: any;

  qrLinkStore: any;

  urlFormPayStore: any;

  client_idStore: any;

  keyGenStore: any;

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
        this.keyGenStore = infoQrLink?.keyGen;
        this.client_idStore = infoQrLink?.client_id;
      })
      .catch((mesError) => {
        this.ErroQrLink = mesError.message;
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
  get getClientidStore() {
    return this.client_idStore;
  }
  get getkeyGenStore() {
    return this.keyGenStore;
  }

  ChangeisLoadingQr_Link = (value: any) => {
    return (this.isLoadingQr_Link = value);
  };
}

export { QrLinktsStore };
