import { changeSomePositionInArray } from "@utils/changeSomePositionInArray";
import { makeObservable, observable, action } from "mobx";

import { RootStore } from "./root";

class FormStore extends RootStore {
  discountStore: any;
  ShowWhatInputIsEmpty: any = false;

  constructor() {
    super();
    makeObservable(this, {
      isLoading: observable,
      ArrayWithAllInputsStore: observable,
      ChangeArrayWithAllInputs: action,
      ChageFocus: action,
      ChageIsShowInfoHelp: action,
      ChangeObjectWithInfoEmailInput: action,
      Error: observable,
      ObjectWithInfoEmailInputStore: observable,
      clientTitleStore: observable,
      employeeNameStore: observable,
      clientIdStore: observable,
      employeeNameStoreForPOST: observable,
      keyGenStore: observable,
      ShowWhatInputIsEmpty: observable,
      ChageShowWhatInputIsEmpty: action,
      DeleteAllHelpers: action,
      ShowList: action,
      positionTypeStore: observable,
      itemListStore: observable,
      discountStore: observable,
    });
  }

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

  ChageIsShowInfoHelp = (name: string, numberPosition: number) => {
    // сначала убнуляемые все видимые подсказки

    if (this.ObjectWithInfoEmailInputStore.IsShowInfoHelp) {
      this.ObjectWithInfoEmailInputStore.IsShowInfoHelp = false;
    }
    if (
      this.ArrayWithAllInputsStore.some(
        (elem: any) => elem.IsShowInfoHelp === true
      )
    ) {
      this.ArrayWithAllInputsStore = this.ArrayWithAllInputsStore.map(
        (elem: any) => {
          return { ...elem, IsShowInfoHelp: false };
        }
      );
    }
    // потом показывем ту, которую хотим
    if (typeof numberPosition === "number") {
      this.ArrayWithAllInputsStore = changeSomePositionInArray(
        this.ArrayWithAllInputsStore,
        "IsShowInfoHelp",
        !this.ArrayWithAllInputsStore.find(
          (elem: any, i: any) => elem.name === name
        ).IsShowInfoHelp,
        name
      );
    } else {
      this.ObjectWithInfoEmailInputStore = {
        ...this.ObjectWithInfoEmailInputStore,
        IsShowInfoHelp: !this.ObjectWithInfoEmailInputStore.IsShowInfoHelp,
      };
    }
  };

  DeleteAllHelpers = () => {
    if (
      this.ArrayWithAllInputsStore.some((elem: any) => elem.isopen === true)
    ) {
      return (this.ArrayWithAllInputsStore = this.ArrayWithAllInputsStore.map(
        (elem: any, i: number) => {
          if (
            elem.hasOwnProperty("isopen") &&
            typeof elem.isopen === "boolean"
          ) {
            return { ...elem, isopen: false };
          } else {
            return { ...elem };
          }
        }
      ));
    }
    if (
      this.ObjectWithInfoEmailInputStore.IsShowInfoHelp ||
      this.ArrayWithAllInputsStore.some(
        (elem: any) => elem.IsShowInfoHelp === true
      )
    ) {
      return (
        (this.ArrayWithAllInputsStore = this.ArrayWithAllInputsStore.map(
          (elem: any, i: number) => {
            return { ...elem, IsShowInfoHelp: false };
          }
        )),
        (this.ObjectWithInfoEmailInputStore = {
          ...this.ObjectWithInfoEmailInputStore,
          IsShowInfoHelp: false,
        })
      );
    }
  };

  ChageFocus = (currentNumber: number, placeholder: string, isVis: boolean) => {
    if (typeof currentNumber === "number") {
      this.ArrayWithAllInputsStore = changeSomePositionInArray(
        this.ArrayWithAllInputsStore,
        "onFocus",
        !this.ArrayWithAllInputsStore.find(
          (elem: any, i: any) => elem.placeholder === placeholder
        ).onFocus,
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
    if (
      !this.ArrayWithAllInputsStore[1].IsRequire ||
      !this.ObjectWithInfoEmailInputStore.IsRequire
    ) {
      return (
        this.ArrayWithAllInputsStore.map((elem: any, i: any) => {
          if (!this.ArrayWithAllInputsStore[1].IsRequire && i === 1) {
            return "Not empty";
          } else {
            return elem.value;
          }
        }).some((elem: any, i: any) => !elem.trim()) ||
        (!this.ObjectWithInfoEmailInputStore.IsRequire
          ? false
          : !this.ObjectWithInfoEmailInputStore.value.trim())
      );
    }
    return (
      this.ArrayWithAllInputsStore.map((elem: any) => elem.value).some(
        (elem: any) => !elem.trim()
      ) || !this.ObjectWithInfoEmailInputStore.value.trim()
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
}

export { FormStore };
