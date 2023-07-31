import React from "react";

import "./CustomSelect.css";

import Input from "../Input/Input";

const CustomSelect = ({
  actualPositionsStore,
  ShowList,
  isopen,
  ...InputProps_First
}: any) => {
  const { name, onChange, uniqKey } = InputProps_First;

  const handler = (EventType: any, elem: any, name: any) => {
    onChange(EventType, elem, name, isopen);
  };
  const InputProps_First_inner = {
    ShowList: ShowList,
    isopen: isopen,
    ...InputProps_First,
  };

  return (
    <div key={uniqKey} className="CustomSelect">
      <Input {...InputProps_First_inner} />
      {isopen && (
        <div className="CustomLIstForSelect">
          {actualPositionsStore.map((elem: any) => (
            <div
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
};

export default CustomSelect;
