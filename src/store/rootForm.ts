import { formAPI } from "@api/getInfoAboutForm";
import { makeObservable, observable, action, runInAction } from "mobx";
const { getInfoAboutForm } = formAPI;

class RootFormStore {
  ArrayWithAllInputsStore: any = [];
  ObjectWithInfoEmailInputStore: any = {};
  clientTitleStore: any;
  employeeNameStore: any;
  clientIdStore: string = "";
  employeeNameStoreForPOST: any;
  keyGenStore: any;
  actualPositionsStore: any;
  positionTypeStore: any;
  itemListStore: any;

  ChangeDataAboutForm = async (key_gen: string) => {
    try {
      const response = await getInfoAboutForm(key_gen);
      if (typeof response !== "object") {
        throw Error(response);
      }

      runInAction(() => {
        const {
          ArrayWithFormInputs,
          ObjectWithInfoEmailInput,
          employeeName,
          employee,
          clientId,
          clientTitle,
          keyGen,
          actualPositions,
          positionType,
          itemList,
        } = response;
        this.employeeNameStore = employeeName;
        this.employeeNameStoreForPOST = employee;
        this.clientTitleStore = clientTitle;
        this.clientIdStore = clientId;
        this.keyGenStore = keyGen;

        this.ArrayWithAllInputsStore = ArrayWithFormInputs;
        this.ObjectWithInfoEmailInputStore = ObjectWithInfoEmailInput;

        this.actualPositionsStore = actualPositions;

        this.positionTypeStore = positionType;
        this.itemListStore = itemList;
      });
    } catch (err: any) {
      return err.message;
    }
  };

  constructor() {
    makeObservable(this, {
      ChangeDataAboutForm: action,
      ArrayWithAllInputsStore: observable,
      ObjectWithInfoEmailInputStore: observable,
      clientTitleStore: observable,
      employeeNameStore: observable,
      clientIdStore: observable,
      employeeNameStoreForPOST: observable,
      keyGenStore: observable,
      actualPositionsStore: observable,
      positionTypeStore: observable,
      itemListStore: observable,
    });
  }
}

export { RootFormStore };
