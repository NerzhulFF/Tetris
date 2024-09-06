export function nextLevelY(arr) {
  return arr.map(obj => {
    return { ...obj, yFigure: obj.yFigure + 1 };
  });
}
