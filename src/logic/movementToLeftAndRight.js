import { FIELD_WIDTH } from "./gameLogic";

export function moveRight(figure, fieldCells) {
  const isWallRight = figure.some(obj => obj.xFigure === FIELD_WIDTH - 1);
  if (isWallRight || isRightFree(figure, fieldCells)) return figure;

  return figure.map(obj => {
    return { ...obj, xFigure: obj.xFigure + 1 };
  });
}

export function moveLeft(figure, fieldCells) {
  const isWallLeft = figure.some(obj => obj.xFigure === 0);
  if (isWallLeft || isLeftFree(figure, fieldCells)) return figure;

  return figure.map(obj => {
    return { ...obj, xFigure: obj.xFigure - 1 };
  });
}

function isRightFree(figure, fieldCells) {
  const stopFigureParts = figure.filter(part => {
    return !figure.some(
      obj => obj.xFigure - part.xFigure === 1 && part.yFigure === obj.yFigure
    );
  });

  const isFigureRight = stopFigureParts.some(obj => {
    if (obj.xFigure > FIELD_WIDTH - 2) return false;
    return fieldCells[obj.yFigure][obj.xFigure + 1].isEmpty;
  });

  return isFigureRight;
}

function isLeftFree(figure, fieldCells) {
  const stopFigureParts = figure.filter(part => {
    return !figure.some(
      obj => part.xFigure - obj.xFigure === 1 && part.yFigure === obj.yFigure
    );
  });

  const isFigureLeft = stopFigureParts.some(obj => {
    if (obj.xFigure < 1) return false;
    return fieldCells[obj.yFigure][obj.xFigure - 1].isEmpty;
  });

  return isFigureLeft;
}
