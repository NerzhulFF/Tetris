import { FIELD_HIEGHT, FIELD_WIDTH } from "./gameLogic";

export function rotate(figure, fieldCells) {
  if (figure.length === 0) return [];
  if (figure[0].name === "square") return figure;

  const { centeredFigure, xDifference, yDifference } =
    centeredFigureFunc(figure);

  const resultedFigure =
    centeredFigure[0]?.name === "pipe"
      ? pipeRotation(centeredFigure, xDifference, yDifference)
      : transformation(centeredFigure, xDifference, yDifference);

  return canRotate(resultedFigure, fieldCells, figure)
    ? resultedFigure
    : figure;
}

function centeredFigureFunc(figure) {
  const centerBlock = figure.find(block => block.center);
  const xDifference = centerBlock.xFigure;
  const yDifference = centerBlock.yFigure;
  const centeredFigure = figure.map(block => {
    return {
      ...block,
      xFigure: block.xFigure - xDifference,
      yFigure: inversionY(block.yFigure - yDifference)
    };
  });

  return { centeredFigure, xDifference, yDifference };
}

function inversionY(value) {
  return -value;
}

function transformation(centeredFigure, dx, dy) {
  return centeredFigure.map(block => {
    return {
      ...block,
      xFigure: block.yFigure + dx,
      yFigure: inversionY(-block.xFigure) + dy
    };
  });
}

function pipeRotation(centeredFigure, xDifference, yDifference) {
  const rotatedPipe = transformation(centeredFigure, xDifference, yDifference);
  switch (rotatedPipe[0]?.direction) {
    case "left":
      return changeCoords(1, 0, rotatedPipe, "down");
    case "down":
      return changeCoords(0, 1, rotatedPipe, "right");
    case "right":
      return changeCoords(-1, 0, rotatedPipe, "up");
    case "up":
      return changeCoords(0, -1, rotatedPipe, "left");
  }
}

function changeCoords(dx, dy, rotatedPipe, direction) {
  return rotatedPipe.map(block => {
    return {
      ...block,
      xFigure: block.xFigure + dx,
      yFigure: block.yFigure + dy,
      direction: direction
    };
  });
}

function canRotate(resultedFigure, fieldCells, figure) {
  const sortedArr = resultedFigure.sort((a, b) => a.xFigure - b.xFigure);
  const minX = sortedArr[0].xFigure;
  const maxX = sortedArr[sortedArr.length - 1].xFigure;
  const maxBottom = resultedFigure
    .sort((a, b) => a.yFigure - b.yFigure)
    .reverse()[0].yFigure;

  const resultMinusFigure = resultedFigure.filter(block => {
    const x = block.xFigure;
    const y = block.yFigure;
    return !figure.some(fig => fig.xFigure === x && fig.yFigure === y);
  });

  const isOtherFiguresAround = resultMinusFigure.some(
    block => fieldCells[block.yFigure][block.xFigure].isEmpty
  );

  return (
    minX >= 0 &&
    maxX <= FIELD_WIDTH - 1 &&
    maxBottom <= FIELD_HIEGHT - 1 &&
    !isOtherFiguresAround
  );
}
