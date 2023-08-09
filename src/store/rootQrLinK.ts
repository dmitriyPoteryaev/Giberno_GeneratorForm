import { qrLinkAPI } from "@api/postLink";
import { makeObservable, observable, action } from "mobx";

const { postLink } = qrLinkAPI;

class RootQrLinkStore {
  qrLinkStore: any;

  urlFormPayStore: any;

  client_idStore: any;

  keyGenStore: any;

  postQr_Link = (
    employee: string,
    client_id: string,
    keyGen: string,
    emailCustomer: string,
    amount: string,
    name: string,
    description: string,
    positionTypeStore: any,
    itemListStore: any[],
    discount: string
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
    ).then(
      action((infoQrLink: any) => {
        if (typeof infoQrLink !== "object") {
          throw Error(infoQrLink);
        }
        this.qrLinkStore = infoQrLink.urlQR;
        this.urlFormPayStore = infoQrLink.urlFormPay;
        this.keyGenStore = infoQrLink.keyGen;
        this.client_idStore = infoQrLink.client_id;
      })
    );
  };

  constructor() {
    makeObservable(this, {
      postQr_Link: action,
      qrLinkStore: observable,
      urlFormPayStore: observable,
      client_idStore: observable,
      keyGenStore: observable,
    });
  }
}

export { RootQrLinkStore };
