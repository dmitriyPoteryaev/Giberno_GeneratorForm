import React, { memo } from "react";

import "./CustomSelect.css";

import AdditionalBlocks from "@shared/components/SelectOrInput/AdditionalBlocks";

import { SelectElement } from "../../../types/formTypes";
import CustomInput from "../CustomInput/CustomInput";

type clickEvent = React.MouseEvent<HTMLDivElement>;

const CustomSelect = memo(
  ({
    actualPositionsStore,
    showlist,
    isopen,
    ...restInputProps
  }: SelectElement) => {
    const { name, onChange, key } = restInputProps;

    const handler = (elem: string, name: string) => {
      onChange(elem, name);
    };

    const ShowDefiniteList = (event: clickEvent, isOpen: boolean) => {
      showlist(isOpen);
    };

    const testid: string = `select_${name}`;

    return (
      <div
        onClick={(event: clickEvent) => {
          ShowDefiniteList(event, !isopen);
        }}
        data-testid={testid}
        key={key}
        className="CustomSelect"
      >
        <CustomInput {...restInputProps}>
          <AdditionalBlocks
            classNameHelper="FormPageLayout__helpblock"
            help={restInputProps.help}
            ChageIsShowInfoHelp={restInputProps.ChageIsShowInfoHelp}
            classNamePlaceHolder="FormPageLayout__newPlaceHolder"
            onFocus={restInputProps.onFocus}
            value={restInputProps.value}
            placeholder={restInputProps.placeholder}
            IsShowInfoHelp={restInputProps.IsShowInfoHelp}
          />
        </CustomInput>
        {isopen && (
          <div className="CustomLIstForSelect">
            {actualPositionsStore.map((elem: string) => (
              <div
                data-testid="select-item"
                key={elem}
                className="CustomLIstForSelect_position"
                onClick={(event: any) => {
                  event.stopPropagation();
                  handler(elem, name);
                }}
              >
                {elem}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
  (prevProps: any, nextProps: any) => {
    if (
      prevProps.isopen === nextProps.isopen &&
      prevProps.value === nextProps.value &&
      prevProps.IsShowInfoHelp === nextProps.IsShowInfoHelp &&
      prevProps.onFocus === nextProps.onFocus &&
      prevProps.IsEmpty === nextProps.IsEmpty &&
      prevProps.classNameInput === nextProps.classNameInput &&
      prevProps.className === nextProps.className
    ) {
      return true;
    }
    return false;
  }
);

export default CustomSelect;
