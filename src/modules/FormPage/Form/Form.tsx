import React, { memo, useState } from "react";

import { changeValue } from "@utils/FormManagement/changeValue";
import { changeVisualValue } from "@utils/FormManagement/changeVisualValue";

import "./Form.css";
import useDeleteAllPopUpWindowFORM from "../../../hooks/useDeleteAllPopUpWindowFORM";
import SelectOrInput from "../../../shared/components/SelectOrInput";
import { ObjectInputProps, itemFromList } from "../../../types/formTypes";

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
    const [FormInputsState, setFormInputsState] = useState(FormInputsStore);

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
        <>
          {FormInputsState.map(
            (
              CurrentInput: ObjectInputProps,
              i: number,
              arr: ObjectInputProps[]
            ) => {
              const { isopen } = CurrentInput;
              const uniqKey =
                typeof isopen === "boolean" ? `select_${i}` : `input_${i}`;
              const InputOrSelectProps = {
                key: `${uniqKey}_Object`,
                type: CurrentInput.type,
                name: CurrentInput.name,
                placeholder: CurrentInput.placeholder,
                value: CurrentInput.value,
                help: CurrentInput.help,
                currentNumber: i,
                IsEmpty: isRedBorder,
                IsShowInfoHelp: CurrentInput.IsShowInfoHelp,
                IsRequire: CurrentInput.IsRequire,
                onFocus: CurrentInput.onFocus,
                ChageFocus: (isFocus: boolean) => {
                  setFormInputsState((prevState: ObjectInputProps[]) => {
                    return changeVisualValue(prevState, i, isFocus, "onFocus");
                  });
                },
                ChageIsShowInfoHelp: () => {
                  setFormInputsState((prevState: ObjectInputProps[]) => {
                    return changeVisualValue(
                      prevState,
                      i,
                      true,
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

              const InputProps = {
                uniqKey: uniqKey,
                ...InputOrSelectProps,
              };

              const SelectProps = {
                uniqKey: uniqKey,
                ...InputOrSelectProps,
                isopen: isopen,
                ShowList: (isOpen: boolean) => {
                  setFormInputsState((prevState: ObjectInputProps[]) => {
                    return changeVisualValue(prevState, i, isOpen, "isopen");
                  });
                },
              };

              return (
                <SelectOrInput
                  key={uniqKey}
                  isopen={isopen}
                  itemListStore={itemListStore}
                  InputOrSelectProps={InputOrSelectProps}
                  SelectProps={SelectProps}
                  InputProps={InputProps}
                  LAST_NUMBER={LAST_NUMBER}
                  i={i}
                />
              );
            }
          )}
        </>
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
