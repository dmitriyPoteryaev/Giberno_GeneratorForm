/** 
 * Меняем массив по специальному атрибуту

 
*/
export const MapArrayItemsBySpecificKey = (arr: any, key: any) => {
  return arr.map((elem: any) => elem[key]);
};
