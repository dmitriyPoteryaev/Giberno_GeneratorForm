import { changeSomePositionInArray } from "@utils/changeSomePositionInArray";
import { DeleteAllPopUpWindow } from "@utils/DeleteAllPopUpWindow";
import { ResultIsGeneralButtonActive } from "@utils/ResultIsGeneralButtonActive";
import { specificChangingValueInForm__LIST } from "@utils/specificChangingValueInForm/specificChangingValueInForm__LIST";
import { specificChangingValueInForm__MANUAL } from "@utils/specificChangingValueInForm/specificChangingValueInForm__MANUAL";
import { specificChangingValueInForm__MANUAL_LIST } from "@utils/specificChangingValueInForm/specificChangingValueInForm__MANUAL_LIST";
import { makeObservable, observable, action, computed, override } from "mobx";

import { RootStore } from "./root";

class FormStore extends RootStore {
  discountStore: any;
  ShowWhatInputIsEmpty: any = false;

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

  get getShowWhatInputIsEmpty() {
    return this.ShowWhatInputIsEmpty;
  }

  ChageShowWhatInputIsEmpty = (value: boolean) => {
    this.ShowWhatInputIsEmpty = value;
  };

  DeleteAllHelpers = () => {
    const {
      NEWArrayWithAllInputsStore,
      NEWObjectWithInfoEmailInputStore,
    }: any = DeleteAllPopUpWindow(
      this.ArrayWithAllInputsStore,
      this.ObjectWithInfoEmailInputStore
    );
    this.ArrayWithAllInputsStore = NEWArrayWithAllInputsStore;

    this.ObjectWithInfoEmailInputStore = NEWObjectWithInfoEmailInputStore;
  };

  ChageIsShowInfoHelp = (name: string, numberPosition: number) => {
    this.DeleteAllHelpers();

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

  get IsGeneralButtonActive() {
    return ResultIsGeneralButtonActive(
      this.ArrayWithAllInputsStore,
      this.ObjectWithInfoEmailInputStore
    );
  }
  ShowList = (name: string) => {
    this.ArrayWithAllInputsStore = this.ArrayWithAllInputsStore.map(
      (elem: any) => {
        if (elem.hasOwnProperty("isopen") && typeof elem.isopen === "boolean") {
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
  };

  get getClientTitleStore() {
    return this.clientTitleStore;
  }

  constructor() {
    super();
    makeObservable(this, {
      ChangeDataAboutForm: override,
      isLoading: override,
      ArrayWithAllInputsStore: override,
      ChangeArrayWithAllInputs: action,
      ChageFocus: action,
      ChageIsShowInfoHelp: action,
      ChangeObjectWithInfoEmailInput: action,
      Error: override,
      ObjectWithInfoEmailInputStore: override,
      clientTitleStore: override,
      getClientTitleStore: computed,
      employeeNameStore: override,
      clientIdStore: override,
      employeeNameStoreForPOST: override,
      keyGenStore: override,
      ShowWhatInputIsEmpty: observable,
      ChageShowWhatInputIsEmpty: action,
      DeleteAllHelpers: action,
      ShowList: action,
      positionTypeStore: override,
      itemListStore: override,
      discountStore: observable,
      IsGeneralButtonActive: computed,
    });
  }
}

export { FormStore };
