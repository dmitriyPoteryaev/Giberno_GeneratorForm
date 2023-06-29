import { formAPI } from "@api/getInfoAboutForm";
import { makeAutoObservable } from "mobx";

const { getInfoAboutForm } = formAPI;

class FormStore {
  Error: any;

  isLoading: any = true;

  // данные о предоставляющем услуги

  employeeNameStore: any;

  clientTitleStore: any;

  // объект со всеми инпутами

  ArrayWithAllInputs: any;

  //всё для имейл инпута

  ObjectWithInfoEmailInput: any;

  constructor() {
    makeAutoObservable(this);
  }

  ChangeDataAboutForm = (key_gen: string) => {
    return getInfoAboutForm(key_gen)
      .then((response: any) => {
        if (typeof response !== "object") {
          throw Error(response);
        }
        const { config, infoForm } = response;

        this.employeeNameStore = infoForm?.employeeName;
        this.clientTitleStore = infoForm?.clientTitle;

        this.ArrayWithAllInputs = [
          {
            value: "",
            type: "text",
            placeholder: infoForm?.itemName?.itemNamePlaceholder,
            help: infoForm?.itemName?.itemNameHelp,
          },
          {
            value: "",
            type: "text",
            placeholder: infoForm?.itemDescription?.itemDescriptionPlaceholder,
            help: infoForm?.itemDescription?.itemDescriptionHelp,
          },
          {
            value: "",
            type: "text",
            placeholder: "Сумма",
          },
        ];

        this.ObjectWithInfoEmailInput = {
          value: "",
          type: "text",
          placeholder: infoForm?.email?.emailPlaceholder,
          help: infoForm?.email?.emailHelp,
        };
      })
      .catch((mesError: any) => {
        this.Error = mesError.message;
      })
      .finally(() => (this.isLoading = false));
  };

  get getemployeeNameStore() {
    return this.employeeNameStore;
  }
  get getclientTitleStore() {
    return this.clientTitleStore;
  }

  get getIsLoading() {
    return this.isLoading;
  }

  get getArrayWithAllInputs() {
    return this.ArrayWithAllInputs;
  }

  ChangeArrayWithAllInputs = (event: any, numberPosition: number) => {
    this.ArrayWithAllInputs = this.ArrayWithAllInputs.map(
      (elem: any, k: any) => {
        if (numberPosition === k) {
          return { ...elem, value: event };
        } else {
          return elem;
        }
      }
    );
  };

  get getObjectWithInfoEmailInput() {
    return this.ObjectWithInfoEmailInput;
  }

  ChangeObjectWithInfoEmailInput = (event: any) => {
    this.ObjectWithInfoEmailInput = {
      ...this.ObjectWithInfoEmailInput,
      value: event,
    };
  };

  get IsGeneralButtonActive() {
    return (
      this.getArrayWithAllInputs
        .map((elem: any) => elem?.value)
        .some((elem: any) => !elem?.trim()) ||
      !this.getObjectWithInfoEmailInput.value?.trim()
    );
  }
}

export { FormStore };
