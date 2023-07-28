import { changeSomePositionInArray } from "@utils/changeSomePositionInArray";
import { DeleteAllPopUpWindow } from "@utils/DeleteAllPopUpWindow";
import { ResultIsGeneralButtonActive } from "@utils/ResultIsGeneralButtonActive";
import { makeObservable, observable, action, computed, override } from "mobx";

import { RootStore } from "./root";

class FormStore extends RootStore {
  discountStore: any;
  ShowWhatInputIsEmpty: any = false;

  // изменить значение в инпутах
  ChangeArrayWithAllInputs = (event: any, name: string) => {
    if (this.positionTypeStore === "LIST") {
      if (name === "description") {
        return;
      }
      if (name === "namePos") {
        const valueDesc = this.itemListStore.find(
          (elem: any) => elem.name === event
        ).description;

        const discount = this.itemListStore.find(
          (elem: any) => elem.name === event
        )?.discount;

        this.ArrayWithAllInputsStore = changeSomePositionInArray(
          this.ArrayWithAllInputsStore,
          "value",
          [event, valueDesc],
          "namePos",
          "description",
          discount
        );
      } else {
        this.ArrayWithAllInputsStore = changeSomePositionInArray(
          this.ArrayWithAllInputsStore,
          "value",
          event,
          name
        );
      }
    }
    if (this.positionTypeStore === "MANUAL_LIST") {
      if (name === "namePos") {
        const discount = this.itemListStore.find(
          (elem: any) => elem.name === event
        )?.discount;

        this.ArrayWithAllInputsStore = changeSomePositionInArray(
          this.ArrayWithAllInputsStore,
          "value",
          [event],
          "namePos",
          discount
        );
      } else {
        this.ArrayWithAllInputsStore = changeSomePositionInArray(
          this.ArrayWithAllInputsStore,
          "value",
          event,
          name
        );
      }
    }
    if (this.positionTypeStore === "MANUAL") {
      this.ArrayWithAllInputsStore = changeSomePositionInArray(
        this.ArrayWithAllInputsStore,
        "value",
        event,
        name
      );
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

    const changingPosition = this.ArrayWithAllInputsStore.find(
      (elem: any, i: any) => elem.name === name
    ).IsShowInfoHelp;

    if (typeof numberPosition === "number") {
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

  ChageFocus = (currentNumber: number, placeholder: string, isVis: boolean) => {
    if (typeof currentNumber === "number") {
      const changingPosition = this.ArrayWithAllInputsStore.find(
        (elem: any, i: any) => elem.placeholder === placeholder
      ).onFocus;

      this.ArrayWithAllInputsStore = changeSomePositionInArray(
        this.ArrayWithAllInputsStore,
        "onFocus",
        !changingPosition,
        placeholder
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

  constructor() {
    super();
    makeObservable(this, {
      isLoading: override,
      ArrayWithAllInputsStore: override,
      ChangeArrayWithAllInputs: action,
      ChageFocus: action,
      ChageIsShowInfoHelp: action,
      ChangeObjectWithInfoEmailInput: action,
      Error: override,
      ObjectWithInfoEmailInputStore: override,
      clientTitleStore: override,
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
