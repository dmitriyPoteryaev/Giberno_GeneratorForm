import { formAPI } from "@api/getInfoAboutForm";
import { makeObservable, observable, action } from "mobx";
const { getInfoAboutForm } = formAPI;

class RootFormStore {
  isLoading: boolean;
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

      const { ArrayWithFormInputs, employeeName } = response;

      this.employeeNameStore = employeeName;
      return response;
    } catch (err: any) {
      return err.message;
    } finally {
      this.isLoading = false;
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
      isLoading: observable,
      ChangeDataAboutForm: action,
    });
    this.ArrayWithAllInputsStore = [];
    this.clientTitleStore = "";
    this.isLoading = true;
  }
}

export { RootFormStore };
