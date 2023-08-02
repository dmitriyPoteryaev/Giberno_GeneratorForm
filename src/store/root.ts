import { formAPI } from "@api/getInfoAboutForm";
import { makeObservable, observable, action } from "mobx";
const { getInfoAboutForm } = formAPI;

class RootStore {
  isLoading: boolean = true;
  ArrayWithAllInputsStore: any = [];
  Error: any;
  ObjectWithInfoEmailInputStore: any = {};
  clientTitleStore: any;
  employeeNameStore: any;
  clientIdStore: string = "";
  employeeNameStoreForPOST: any;
  keyGenStore: any;
  actualPositionsStore: any;
  positionTypeStore: any;
  itemListStore: any;

  ChangeDataAboutForm = (key_gen: string) => {
    getInfoAboutForm(key_gen)
      .then((response: any) => {
        if (typeof response !== "object") {
          throw Error(response);
        }

        return response;
      })
      .then(
        action((response: any) => {
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
        })
      )
      .catch((mesError: any) => {
        this.Error = mesError.message;
      })
      .finally(action(() => (this.isLoading = false)));
  };

  constructor() {
    makeObservable(this, {
      ChangeDataAboutForm: action,
      isLoading: observable,
      ArrayWithAllInputsStore: observable,
      ObjectWithInfoEmailInputStore: observable,
      Error: observable,
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

export { RootStore };
