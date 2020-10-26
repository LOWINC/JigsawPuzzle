import immer from "immer";

export function swap<T extends any[]>(
  arr: T,
  dragIndex: number,
  hoverIndex: number
) {
  const newArr = immer(arr, (draft) => {
    const dragVal = draft[dragIndex];
    const hoverVal = draft[hoverIndex];
    draft[dragIndex] = hoverVal;
    draft[hoverIndex] = dragVal;
  });

  return newArr;
}
