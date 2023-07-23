export const sortNamesPositionsByLetter = (
  arrayWithPositions: any,
  filterInput: any
) => {
  return arrayWithPositions.filter((position: any) =>
    position.toLowerCase().includes(filterInput.toLowerCase())
  );
};
