import { useEffect } from "react";

import { ObjectInputProps } from "../types/formTypes";

const useDeleteAllPopUpWindowFORM = (
  changeState: Function,
  state: ObjectInputProps[]
) => {
  const DeleteAllPopUpWindowStore = () => {
    changeState((prevState: ObjectInputProps[]) => {
      return prevState.map((input: ObjectInputProps) => {
        if (
          typeof input.isopen === "boolean" ||
          input.IsShowInfoHelp === true
        ) {
          return { ...input, isopen: false, IsShowInfoHelp: false };
        } else {
          return input;
        }
      });
    });
  };

  useEffect(() => {
    const conditionForRenfer = state.some(
      (input: ObjectInputProps) =>
        input.isopen === true ||
        state.some((input: ObjectInputProps) => input.IsShowInfoHelp === true)
    );
    if (conditionForRenfer)
      document.addEventListener("click", DeleteAllPopUpWindowStore);

    return () => {
      document.removeEventListener("click", DeleteAllPopUpWindowStore);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
};

export default useDeleteAllPopUpWindowFORM;
