import React, { memo, useState } from "react";

import SelectOrInput from "@shared/components/SelectOrInput";
import { changeValue } from "@utils/FormManagement/changeValue";
import { changeVisualValue } from "@utils/FormManagement/changeVisualValue";

import "./Form.css";

import useDeleteAllPopUpWindowFORM from "../../../../hooks/useDeleteAllPopUpWindowFORM";
import {
  ObjectInputProps,
  itemFromList,
  InputElement,
  ObjectSelectProps,
} from "../../../../types/formTypes";

export type FormProps = {
  /** */
  itemListStore: itemFromList[];
  /**  */
  FormInputsStore: ObjectInputProps[];
  /**  */
  changeGlobalStateInputsForm: (value: ObjectInputProps[]) => void;
  /**b */
  positionTypeStore: string;
  /**  */
  isRedBorder: boolean;
  /**  */
  clientTitleStore: string;
};

const Form: React.FC<FormProps> = memo(
  (props) => {
    const {
      itemListStore,
      FormInputsStore,
      changeGlobalStateInputsForm,
      positionTypeStore,
      isRedBorder,
      clientTitleStore,
    } = props;
    const [FormInputsState, setFormInputsState] =
      useState<ObjectInputProps[]>(FormInputsStore);

    const additionalBorder =
      itemListStore?.length - 7 > 0 ? (itemListStore?.length - 7) * 50 : 0;

    useDeleteAllPopUpWindowFORM(setFormInputsState, FormInputsState);

    changeGlobalStateInputsForm(FormInputsState);

    return (
      <form
        className="FormPageLayout__form"
        style={{
          marginBottom: itemListStore ? `${450 + additionalBorder}px` : "450px",
        }}
      >
        <div className="FormPageLayout__title">{clientTitleStore}</div>
        <div
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          {FormInputsState.map(
            (
              CurrentInput: ObjectInputProps,
              i: number,
              arr: ObjectInputProps[]
            ) => {
              const { isopen } = CurrentInput;

              const uniqKey =
                typeof isopen === "boolean" ? `select_${i}` : `input_${i}`;
              const InputProps: InputElement = {
                key: `${uniqKey}_Object`,
                type: CurrentInput.type,
                name: CurrentInput.name,
                placeholder: CurrentInput.placeholder,
                value: CurrentInput.value,
                help: CurrentInput.help,
                currentNumber: i,
                isopen: CurrentInput.isopen,
                IsEmpty: isRedBorder,
                IsShowInfoHelp: CurrentInput.IsShowInfoHelp,
                IsRequire: CurrentInput.IsRequire,
                onFocus: CurrentInput.onFocus,
                ChageFocus: (isFocus: boolean) => {
                  setFormInputsState((prevState: ObjectInputProps[]) => {
                    return changeVisualValue(prevState, i, isFocus, "onFocus");
                  });
                },
                ChageIsShowInfoHelp: (value: boolean) => {
                  setFormInputsState((prevState: ObjectInputProps[]) => {
                    return changeVisualValue(
                      prevState,
                      i,
                      value,
                      "IsShowInfoHelp"
                    );
                  });
                },
                onChange: (value: string, name: string) => {
                  setFormInputsState((prevState: ObjectInputProps[]) => {
                    return changeValue(
                      prevState,
                      name,
                      value,
                      positionTypeStore,
                      itemListStore
                    );
                  });
                },
              };
              const LAST_NUMBER: number = arr.length - 1;

              const SelectProps: ObjectSelectProps = {
                ...InputProps,
                key: uniqKey,
                itemliststore: itemListStore,
                showlist: (isOpen: boolean) => {
                  setFormInputsState((prevState: ObjectInputProps[]) => {
                    return changeVisualValue(prevState, i, isOpen, "isopen");
                  });
                },
              };

              return (
                <SelectOrInput
                  key={uniqKey}
                  SelectProps={SelectProps}
                  InputProps={InputProps}
                  LAST_NUMBER={LAST_NUMBER}
                  i={i}
                />
              );
            }
          )}
        </div>
      </form>
    );
  },
  (prevProps: any, nextProps: any) => {
    if (prevProps.isRedBorder === nextProps.isRedBorder) {
      return true;
    } else {
      return false;
    }
  }
);

export default Form;
