import React from "react";

import CustomSelect from "@shared/components/CustomSelect/CustomSelect";
import Input from "@shared/components/Input/Input";
import { formStore } from "@store/index";
import { MapArrayItemsBySpecificKey } from "@utils/MapArrayItemsBySpecificKey";
import { observer } from "mobx-react-lite";
import "./Form.css";

const Form = observer(() => {
  const {
    getClientTitleStore,
    ArrayWithAllInputsStore,
    ChangeArrayWithAllInputs,
    ShowWhatInputIsEmpty,
    ChageIsShowInfoHelp,
    ChageFocus,
    ShowList,
    itemListStore,
  } = formStore;

  const additionalBorder =
    itemListStore?.length - 7 > 0 ? (itemListStore?.length - 7) * 50 : 0;
  return (
    <form
      key={"form"}
      className="FormPageLayout__form"
      style={{
        marginBottom: itemListStore ? `${450 + additionalBorder}px` : "450px",
      }}
    >
      <div className="FormPageLayout__title">{getClientTitleStore}</div>
      <>
        {ArrayWithAllInputsStore.filter(
          (CurrentInput: any, i: any) => CurrentInput.IsEnabled
        ).map((CurrentInput: any, i: any, arr: any) => {
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
            IsEmpty: ShowWhatInputIsEmpty,
            IsShowInfoHelp: CurrentInput.IsShowInfoHelp,
            IsRequire: CurrentInput.IsRequire,
            onFocus: CurrentInput.onFocus,
            ChageFocus: ChageFocus,
            ChageIsShowInfoHelp: ChageIsShowInfoHelp,
            onChange: (type: any, value: any, name: any, isopen: any) => {
              if (type === "click" || typeof isopen !== "boolean") {
                ChangeArrayWithAllInputs(value, name);
              }
            },
          };
          const LAST_NUMBER: number = arr.length - 1;

          if (typeof isopen === "boolean") {
            const SelectProps = {
              uniqKey: uniqKey,
              ShowList: ShowList,
              isopen: isopen,
              ...InputOrSelectProps,
            };
            switch (i) {
              case 0:
                const SelectProps_First = {
                  className: "Formpagelayout__select_first",
                  actualPositionsStore: MapArrayItemsBySpecificKey(
                    itemListStore,
                    "name"
                  ),
                  ...SelectProps,
                };
                return <CustomSelect {...SelectProps_First} />;
              case LAST_NUMBER:
                const SelectProps_Last = {
                  className: "Formpagelayout__select_last",
                  ...InputOrSelectProps,
                };
                return <CustomSelect {...SelectProps_Last} />;
              default:
                const SelectProps_Nested = {
                  actualPositionsStore: MapArrayItemsBySpecificKey(
                    itemListStore,
                    "description"
                  ),
                  ...SelectProps,
                };
                return <CustomSelect {...SelectProps_Nested} />;
            }
          }

          const InputProps = {
            uniqKey: uniqKey,
            ...InputOrSelectProps,
          };

          switch (i) {
            case 0:
              const InputProps_First = {
                className: "Formpagelayout__input_first",
                ...InputProps,
              };
              return <Input {...InputProps_First} />;
            case LAST_NUMBER:
              const InputProps_Last = {
                className: "Formpagelayout__input_last",
                ...InputProps,
              };
              return <Input {...InputProps_Last} />;
            default:
              const InputProps_Nested = {
                ...InputProps,
              };
              return <Input {...InputProps_Nested} />;
          }
        })}
      </>
    </form>
  );
});

export default Form;
