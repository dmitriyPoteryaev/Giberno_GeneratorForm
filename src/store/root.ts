import { formAPI } from "@api/getInfoAboutForm";
const { getInfoAboutForm } = formAPI;

class RootStore {
  isLoading: boolean = true;
  ArrayWithAllInputsStore: any = [];
  Error: any;
  ObjectWithInfoEmailInputStore: any = {};
  clientTitleStore: any;
  employeeNameStore: any;
  clientIdStore: any;
  employeeNameStoreForPOST: any;
  keyGenStore: any;
  actualPositionsStore: any;
  positionTypeStore: any;
  itemListStore: any;

  constructor() {
    this.isLoading = this.isLoading;
    this.ArrayWithAllInputsStore = this.ArrayWithAllInputsStore;
    this.ObjectWithInfoEmailInputStore = this.ObjectWithInfoEmailInputStore;
    this.Error = this.Error;
    this.clientTitleStore = this.clientTitleStore;
    this.employeeNameStore = this.employeeNameStore;
    this.clientIdStore = this.clientIdStore;
    this.employeeNameStoreForPOST = this.employeeNameStoreForPOST;
    this.keyGenStore = this.keyGenStore;
    this.actualPositionsStore = this.actualPositionsStore;
    this.positionTypeStore = this.positionTypeStore;
    this.itemListStore = this.itemListStore;
  }

  ChangeDataAboutForm = (key_gen: string) => {
    return getInfoAboutForm(key_gen)
      .then((response: any) => {
        if (typeof response !== "object") {
          throw Error(response);
        }
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
      .catch((mesError: any) => {
        this.Error = mesError.message;
      })
      .finally(() => (this.isLoading = false));
  };
}

export { RootStore };
