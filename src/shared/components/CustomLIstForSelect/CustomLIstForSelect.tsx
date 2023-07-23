import React from "react";

import "./CustomLIstForSelect.css";
const CustomLIstForSelect = (props: any) => {
  const { actualPositionsStore, key, onChange, name, currentNumber } = props;
  const handler = (elem: any) => {
    onChange(elem, currentNumber, name);
  };

  return (
    <div className="CustomLIstForSelect">
      {actualPositionsStore.map((elem: any) => (
        <div
          className="CustomLIstForSelect_position"
          onClick={() => {
            handler(elem);
          }}
          key={elem}
        >
          {elem}
        </div>
      ))}
    </div>
  );
};

export default CustomLIstForSelect;
