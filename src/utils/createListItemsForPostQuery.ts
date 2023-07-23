export const createListItemsForPostQuery = (arr: any, amount: any) => {
  return arr.reduce((accum: any, elem: any) => {
    if (elem.discount === "ON_EMPLOYEE") {
      return [
        ...accum,
        {
          itemID: elem.ItemID,
          amount: +amount,
          amountAfterDiscount: 0,
        },
      ];
    }
    if (elem.discount === "PROPORTIONAL") {
      return [
        ...accum,
        {
          itemID: elem.ItemID,
          amount: +amount,
          amountAfterDiscount: +amount,
        },
      ];
    }
  }, []);
};
