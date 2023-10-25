import { useEffect } from "react";

import { ObjectInputProps } from "../types/formTypes";

/** 
 * Данный хук удаляет все всплывающие окна в footer по нажатию на страницу
 
*/
const useDeleteAllPopUpWindowEmail = (
  changeState: Function,
  state: ObjectInputProps
) => {
  const DeleteAllPopUpWindowStore = () => {
    changeState((prevState: ObjectInputProps) => {
      return { ...prevState, IsShowInfoHelp: false };
    });
  };
  useEffect(() => {
    if (state.IsShowInfoHelp === true)
      document.addEventListener("click", DeleteAllPopUpWindowStore);

    return () => {
      document.removeEventListener("click", DeleteAllPopUpWindowStore);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
};

export default useDeleteAllPopUpWindowEmail;
