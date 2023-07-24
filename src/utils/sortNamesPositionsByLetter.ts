export const sortNamesPositionsByLetter = (
  arrayWithPositions: any,
  filterInput: any
) => {
  const filter_array = arrayWithPositions.filter((position: any) =>
    position.toLowerCase().includes(filterInput.toLowerCase())
  );

  if (filter_array.length > 5) {
    return filter_array.reduce((accum: any, elem: string, i: number) => {
      if (i <= 4) {
        return [...accum, elem];
      }
      if (i === 5) {
        return [...accum, "..."];
      }
      if (i > 5) {
        return accum;
      }
    }, []);
  }
  return filter_array;
};
