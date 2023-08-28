import React, { memo } from "react";

import "./CustomSelect.css";

import Input from "../Input/Input";

const CustomSelect = memo(
  ({ actualPositionsStore, ShowList, isopen, ...InputProps_First }: any) => {
    const { name, onChange, uniqKey, currentNumber } = InputProps_First;

    const handler = (EventType: any, elem: any, name: any) => {
      onChange(EventType, elem, name, isopen);
    };
    const InputProps_First_inner = {
      ShowList: ShowList,
      isopen: isopen,
      ...InputProps_First,
    };

    const testid: string = `select_${currentNumber}`;

    return (
      <div key={uniqKey} className="CustomSelect">
        <Input {...InputProps_First_inner} />
        {isopen && (
          <div data-testid={testid} className="CustomLIstForSelect">
            {actualPositionsStore.map((elem: any) => (
              <div
                data-testid="select-item"
                key={elem}
                className="CustomLIstForSelect_position"
                onClick={(event) => {
                  handler(event.type, elem, name);
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
