import React, { memo } from "react";

import "./CustomSelect.css";

import CustomInput from "../CustomInput/CustomInput";

const CustomSelect = memo(
  ({ actualPositionsStore, ShowList, isopen, ...InputProps_First }: any) => {
    const { name, onChange, uniqKey } = InputProps_First;

    const handler = (elem: any, name: any) => {
      onChange(elem, name);
    };
    const InputProps_inner = {
      ShowList: ShowList,
      isopen: isopen,
      ...InputProps_First,
    };

    const testid: string = `select_${name}`;

    return (
      <div data-testid={testid} key={uniqKey} className="CustomSelect">
        <CustomInput {...InputProps_inner} />
        {isopen && (
          <div className="CustomLIstForSelect">
            {actualPositionsStore.map((elem: any) => (
              <div
                data-testid="select-item"
                key={elem}
                className="CustomLIstForSelect_position"
                onClick={(event) => {
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
