import { formAPI } from "@api/getInfoAboutForm";
import { makeObservable, observable, action } from "mobx";
const { getInfoAboutForm } = formAPI;

class RootFormStore {
  ArrayWithAllInputsStore: any;
  ObjectWithInfoEmailInputStore: any = {};
  clientTitleStore: any;
  employeeNameStore: any;
  employeeNameStoreForPOST: any;
  keyGenStore: any;
  actualPositionsStore: any;
  clientIdStore: any;
  positionTypeStore: any;
  itemListStore: any;

  ChangeDataAboutForm = async (key_gen: string) => {
    try {
      const response = await getInfoAboutForm(key_gen);
      if (typeof response !== "object") {
        throw Error(response);
      }

      const {
        employeeName,
        positionType,
        itemList,
        clientId,
        keyGen,
        employee,
      } = response;

      this.employeeNameStore = employeeName;
      this.positionTypeStore = positionType;
      this.itemListStore = itemList;
      this.clientIdStore = clientId;
      this.keyGenStore = keyGen;
      this.employeeNameStoreForPOST = employee;
      return response;
    } catch (err: any) {
      return err.message;
    }
  };

  ShowWhatInputIsEmpty: boolean = false;

  // изменить значение в инпутах
  ChangeArrayWithAllInputs = (arr: any) => {
    this.ArrayWithAllInputsStore = arr;
  };
  ChangeObjEmail = (obj: any) => {
    this.ObjectWithInfoEmailInputStore = { ...obj };
  };

  constructor() {
    makeObservable(this, {
      ArrayWithAllInputsStore: observable,
      clientTitleStore: observable,
      positionTypeStore: observable,
      ChangeDataAboutForm: action,
    });
    this.ArrayWithAllInputsStore = [];
    this.clientTitleStore = "";
  }
}

export { RootFormStore };
