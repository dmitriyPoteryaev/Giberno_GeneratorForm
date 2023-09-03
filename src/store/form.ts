import { changeSomePositionInArray } from "@utils/changeSomePositionInArray";
import { checkValidMail } from "@utils/checkValidMail";
import { DeleteAllPopUpWindow } from "@utils/DeleteAllPopUpWindow";
import { ResultIsGeneralButtonDisabled } from "@utils/ResultIsGeneralButtonDisabled";
import { specificChangingValueInForm__LIST } from "@utils/specificChangingValueInForm/specificChangingValueInForm__LIST";
import { specificChangingValueInForm__MANUAL } from "@utils/specificChangingValueInForm/specificChangingValueInForm__MANUAL";
import { specificChangingValueInForm__MANUAL_LIST } from "@utils/specificChangingValueInForm/specificChangingValueInForm__MANUAL_LIST";
import { makeObservable, observable, action, computed, override } from "mobx";

import { RootFormStore } from "./rootForm";

class FormStore extends RootFormStore {
  discountStore: any;
  ShowWhatInputIsEmpty: boolean = false;

  // изменить значение в инпутах
  ChangeArrayWithAllInputs = (event: any, name: string) => {
    switch (this.positionTypeStore) {
      case "MANUAL":
        return (this.ArrayWithAllInputsStore =
          specificChangingValueInForm__MANUAL(
            this.ArrayWithAllInputsStore,
            name,
            event
          ));
      case "LIST":
        return (this.ArrayWithAllInputsStore =
          specificChangingValueInForm__LIST(
            this.ArrayWithAllInputsStore,
            this.itemListStore,
            name,
            event
          ));
      case "MANUAL_LIST":
        return (this.ArrayWithAllInputsStore =
          specificChangingValueInForm__MANUAL_LIST(
            this.ArrayWithAllInputsStore,
            this.itemListStore,
            name,
            event
          ));

      default:
        return (this.ArrayWithAllInputsStore =
          specificChangingValueInForm__MANUAL(
            this.ArrayWithAllInputsStore,
            name,
            event
          ));
    }
  };

  ChageShowWhatInputIsEmpty = (value: boolean): void => {
    this.ShowWhatInputIsEmpty = value;
  };

  DeleteAllPopUpWindow = () => {
    const {
      NEWArrayWithAllInputsStore,
      NEWObjectWithInfoEmailInputStore,
    }: any = DeleteAllPopUpWindow(
      this.ArrayWithAllInputsStore,
      this.ObjectWithInfoEmailInputStore
    );

    if (
      this.ArrayWithAllInputsStore.some(
        (elem: any) =>
          elem.isopen === true ||
          this.ArrayWithAllInputsStore.some(
            (elem: any) => elem.IsShowInfoHelp === true
          )
      )
    ) {
      this.ArrayWithAllInputsStore = NEWArrayWithAllInputsStore;
    }

    if (this.ObjectWithInfoEmailInputStore.IsShowInfoHelp) {
      this.ObjectWithInfoEmailInputStore = NEWObjectWithInfoEmailInputStore;
    }
  };

  ChageIsShowInfoHelp = (name: string, numberPosition: number) => {
    this.DeleteAllPopUpWindow();

    if (typeof numberPosition === "number") {
      const changingPosition = this.ArrayWithAllInputsStore.find(
        (elem: any, i: any) => elem.name === name
      ).IsShowInfoHelp;
      this.ArrayWithAllInputsStore = changeSomePositionInArray(
        this.ArrayWithAllInputsStore,
        "IsShowInfoHelp",
        !changingPosition,
        name
      );
    } else {
      this.ObjectWithInfoEmailInputStore = {
        ...this.ObjectWithInfoEmailInputStore,
        IsShowInfoHelp: !this.ObjectWithInfoEmailInputStore.IsShowInfoHelp,
      };
    }
  };

  ChageFocus = (currentNumber: number, name: string, isVis: boolean) => {
    if (typeof currentNumber === "number") {
      this.ArrayWithAllInputsStore = changeSomePositionInArray(
        this.ArrayWithAllInputsStore,
        "onFocus",
        isVis,
        name
      );
    } else {
      this.ObjectWithInfoEmailInputStore = {
        ...this.ObjectWithInfoEmailInputStore,
        onFocus: isVis,
      };
    }
  };

  ChangeObjectWithInfoEmailInput = (event: any) => {
    this.ObjectWithInfoEmailInputStore = {
      ...this.ObjectWithInfoEmailInputStore,
      value: event,
    };
  };

  get IsGeneralButtonDisabled() {
    return ResultIsGeneralButtonDisabled(
      this.ArrayWithAllInputsStore,
      this.ObjectWithInfoEmailInputStore
    );
  }

  get isValidMail() {
    return checkValidMail(
      this.ObjectWithInfoEmailInputStore.IsRequire,
      this.ObjectWithInfoEmailInputStore.value
    );
  }

  ShowList = (name: string) => {
    if (
      !this.ArrayWithAllInputsStore.find((elem: any) => elem.name === name)
        .isopen
    ) {
      this.ArrayWithAllInputsStore = this.ArrayWithAllInputsStore.map(
        (elem: any) => {
          if (
            elem.hasOwnProperty("isopen") &&
            typeof elem.isopen === "boolean"
          ) {
            return { ...elem, isopen: false };
          } else {
            return { ...elem };
          }
        }
      );
      this.ArrayWithAllInputsStore = this.ArrayWithAllInputsStore.map(
        (elem: any, i: number) => {
          if (elem.hasOwnProperty("isopen") && elem.name === name) {
            return { ...elem, isopen: true };
          } else {
            return { ...elem };
          }
        }
      );
    }
  };

  get getClientTitleStore() {
    return this.clientTitleStore;
  }

  constructor() {
    super();
    makeObservable(this, {
      ChangeDataAboutForm: override,
      ArrayWithAllInputsStore: override,
      ChangeArrayWithAllInputs: action,
      ChageFocus: action,
      ChageIsShowInfoHelp: action,
      ChangeObjectWithInfoEmailInput: action,
      ObjectWithInfoEmailInputStore: override,
      clientTitleStore: override,
      getClientTitleStore: computed,
      employeeNameStore: override,
      clientIdStore: override,
      employeeNameStoreForPOST: override,
      keyGenStore: override,
      ShowWhatInputIsEmpty: observable,
      ChageShowWhatInputIsEmpty: action,
      DeleteAllPopUpWindow: action,
      ShowList: action,
      positionTypeStore: override,
      itemListStore: override,
      discountStore: observable,
      IsGeneralButtonDisabled: computed,
    });
  }
}

export { FormStore };
