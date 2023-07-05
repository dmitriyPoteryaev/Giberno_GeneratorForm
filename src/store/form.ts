import { formAPI } from "@api/getInfoAboutForm";
import { makeAutoObservable } from "mobx";

const { getInfoAboutForm } = formAPI;

class FormStore {
  Error: any;

  isLoading: any = true;

  // данные о предоставляющем услуги

  clientTitleStore: any;

  // объект со всеми инпутами

  ArrayWithAllInputs: any;

  ShowWhatInputIsEmpty: any = false;

  //всё для имейл инпута

  ObjectWithInfoEmailInput: any;

  // всё для пост запроса

  clientIdStore: any;

  employeeNameStore: any;

  employeeNameStoreForPOST: any;
  keyGenStore: any;

  constructor() {
    makeAutoObservable(this);
  }

  ChangeDataAboutForm = (key_gen: string) => {
    return getInfoAboutForm(key_gen)
      .then((response: any) => {
        if (typeof response !== "object") {
          throw Error(response);
        }
        //to-do - потом исправить
        const { config, infoForm } = response;

        // const infoForm = response.data;

        this.employeeNameStore = infoForm?.employeeName;
        this.employeeNameStoreForPOST = infoForm?.employee;
        this.clientTitleStore = infoForm?.clientTitle;
        this.clientIdStore = infoForm?.clientId;
        this.keyGenStore = infoForm?.keyGen;

        this.ArrayWithAllInputs = [
          {
            value: "",
            type: "text",
            placeholder: infoForm?.itemName?.itemNamePlaceholder,
            help: infoForm?.itemName?.itemNameHelp,
            IsShowInfoHelp: false,
            onFocus: false,
          },
          {
            value: "",
            type: "text",
            placeholder: infoForm?.itemDescription?.itemDescriptionPlaceholder,
            help: infoForm?.itemDescription?.itemDescriptionHelp,
            IsShowInfoHelp: false,
            onFocus: false,
          },
          {
            value: "",
            type: "text",
            placeholder: "Сумма",
            onFocus: false,
          },
        ];

        this.ObjectWithInfoEmailInput = {
          value: "",
          type: "text",
          placeholder: infoForm?.email?.emailPlaceholder,
          help: infoForm?.email?.emailHelp,
          IsShowInfoHelp: false,
          onFocus: false,
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
        ?.map((elem: any) => elem?.value)
        ?.some((elem: any) => !elem?.trim()) ||
      !this.getObjectWithInfoEmailInput.value?.trim()
    );
  }

  get getShowWhatInputIsEmpty() {
    return this.ShowWhatInputIsEmpty;
  }

  ChageShowWhatInputIsEmpty = (value: boolean) => {
    this.ShowWhatInputIsEmpty = value;
  };

  ChageIsShowInfoHelp = (numberPosition: number) => {
    if (this.ObjectWithInfoEmailInput.IsShowInfoHelp) {
      this.ObjectWithInfoEmailInput.IsShowInfoHelp = false;
    }
    if (
      this.ArrayWithAllInputs.some((elem: any) => elem.IsShowInfoHelp === true)
    ) {
      this.ArrayWithAllInputs = this.ArrayWithAllInputs.map((elem: any) => {
        return { ...elem, IsShowInfoHelp: false };
      });
    }
    if (typeof numberPosition === "number") {
      this.ArrayWithAllInputs = this.ArrayWithAllInputs.map(
        (elem: any, i: number) => {
          if (numberPosition === i) {
            return { ...elem, IsShowInfoHelp: !elem.IsShowInfoHelp };
          } else {
            return elem;
          }
        }
      );
    } else {
      this.ObjectWithInfoEmailInput = {
        ...this.ObjectWithInfoEmailInput,
        IsShowInfoHelp: !this.ObjectWithInfoEmailInput.IsShowInfoHelp,
      };
    }
  };

  DeleteAllHelpers = () => {
    if (
      this.ObjectWithInfoEmailInput.IsShowInfoHelp ||
      this.ArrayWithAllInputs.some((elem: any) => elem.IsShowInfoHelp === true)
    ) {
      this.ArrayWithAllInputs = this.ArrayWithAllInputs.map(
        (elem: any, i: number) => {
          return { ...elem, IsShowInfoHelp: false };
        }
      );

      this.ObjectWithInfoEmailInput = {
        ...this.ObjectWithInfoEmailInput,
        IsShowInfoHelp: false,
      };
    }
  };

  ChageFocus = (numberPosition: number) => {
    if (typeof numberPosition === "number") {
      this.ArrayWithAllInputs = this.ArrayWithAllInputs.map(
        (elem: any, i: number) => {
          if (numberPosition === i) {
            return { ...elem, onFocus: !elem.onFocus };
          } else {
            return elem;
          }
        }
      );
    } else {
      this.ObjectWithInfoEmailInput = {
        ...this.ObjectWithInfoEmailInput,
        onFocus: !this.ObjectWithInfoEmailInput.onFocus,
      };
    }
  };

  // всё для пост запроса

  get getclientId() {
    return this.clientIdStore;
  }

  get getkeyGenStore() {
    return this.keyGenStore;
  }
  get getemployeeNameStoreForPOST() {
    return this.employeeNameStoreForPOST;
  }
}

export { FormStore };
