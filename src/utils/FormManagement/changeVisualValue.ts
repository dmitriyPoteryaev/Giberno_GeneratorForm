import { ObjectInputProps } from "../../types/formTypes";
/**
 * Над конкретным полем в форме могут появляться либо вслывающий список, либо поянительная записка для клиента, чтобы ему объяснить зачем это поле нужно.
 * Данная функция меняет состояние этих всплывающих окно ( открыто или закрыто )
 * @param  {ObjectInputProps[]} arr массив со всей информацией по форме
 *  @param  {string} position номер поля в формк
 * @param  {boolen} value
 *  @return {ObjectInputProps[]}
 */
export const changeVisualValue = (
  arr: ObjectInputProps[],
  position: number,
  value: boolean,
  namePos: string
) => {
  return arr.map((input: any, k: number) => {
    if (k !== position && input.isopen === true) {
      return { ...input, isopen: false };
    }
    if (k !== position && input.IsShowInfoHelp === true) {
      return { ...input, IsShowInfoHelp: false };
    }
    if (k === position) {
      return { ...input, [namePos]: value };
    } else {
      return input;
    }
  });
};
