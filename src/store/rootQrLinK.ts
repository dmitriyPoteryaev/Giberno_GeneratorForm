import { qrLinkAPI } from "@api/postLink";
import { makeObservable, action } from "mobx";

const { postLink } = qrLinkAPI;

class RootQrLinkStore {
  postQr_Link = async (
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
    const infoQrLink = await postLink(
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
    );

    if (typeof infoQrLink !== "object") {
      throw Error(infoQrLink);
    }

    return infoQrLink;
  };

  constructor() {
    makeObservable(this, {
      postQr_Link: action,
    });
  }
}

export { RootQrLinkStore };
