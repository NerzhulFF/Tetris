import { nextLevelY } from "../utils/update";
import { checkForLost } from "./checkForLost";
import { getRandomFigure } from "./figures";
import { moveLeft, moveRight } from "./movementToLeftAndRight";
import { rotate } from "./rotation";

export const FIELD_HIEGHT = 20;
export const FIELD_WIDTH = 10;

export function startMove(fieldCells, setFieldCells, setScore, setIsLost) {
  if (fieldCells == null) return;

  let figure = getRandomFigure();
  fieldCells = nextUpdate(fieldCells, [], figure);

  const controller = new AbortController();
  const { signal } = controller;
  document.addEventListener("keydown", eventListenerHandler, { signal });

  const movement = setInterval(setIntervalHandler, 500);

  function setIntervalHandler() {
    if (isTimeToStop(figure)) {
      clearInterval(movement);
      controller.abort();
      fieldCells = clearCompletedLines(fieldCells);

      if (checkForLost(fieldCells[1])) {
        setIsLost(true);
      } else {
        startMove(fieldCells, setFieldCells, setScore, setIsLost);
      }
    } else {
      const previousAboveFigurePosition = [...figure];
      figure = nextLevelY(figure);
      fieldCells = nextUpdate(fieldCells, previousAboveFigurePosition, figure);
    }
  }

  function nextUpdate(
    fieldCells,
    previousAboveFigurePosition = [],
    currentFigurePosition = []
  ) {
    const cleanupedField = updatedFieldFunc(
      fieldCells,
      previousAboveFigurePosition,
      false
    );

    const paintedField = updatedFieldFunc(
      cleanupedField,
      currentFigurePosition,
      true
    );

    setFieldCells(paintedField);

    return paintedField;
  }

  function updatedFieldFunc(fieldCells, figure, painting) {
    const updatedField = [];

    for (let y = 0; y < FIELD_HIEGHT; y++) {
      const updatedFieldRow = updateRow(figure, fieldCells[y], painting);
      updatedField.push(updatedFieldRow);
    }

    return updatedField;
  }

  function updateRow(figure = [], row, painting) {
    const updatedRow = row.map(cell => {
      const isOccupied = figure.some(obj => {
        return obj.xFigure === cell.x && obj.yFigure === cell.y;
      });
      if (isOccupied)
        return { ...cell, isEmpty: painting, color: figure[0].color };

      return cell;
    });

    return updatedRow;
  }

  function isTimeToStop(figure) {
    const isBottomTouched = figure.some(
      obj => obj.yFigure === FIELD_HIEGHT - 1
    );

    const stopFigureParts = figure.filter(part => {
      return !figure.some(
        obj => obj.yFigure - part.yFigure === 1 && part.xFigure === obj.xFigure
      );
    });

    const isFigureBelow = stopFigureParts.some(obj => {
      if (obj.yFigure > FIELD_HIEGHT - 2) return false;
      return fieldCells[obj.yFigure + 1][obj.xFigure].isEmpty;
    });

    return isBottomTouched || isFigureBelow;
  }

  function eventListenerHandler(e) {
    const previousAboveFigurePosition = [...figure];

    if (e.keyCode === 39) {
      figure = moveRight(figure, fieldCells);
    }
    if (e.keyCode === 37) {
      figure = moveLeft(figure, fieldCells);
    }
    if (e.keyCode === 70) {
      figure = rotate(figure, fieldCells);
    }
    if (e.keyCode === 40) {
      figure = moveDown(figure);
    }

    fieldCells = nextUpdate(fieldCells, previousAboveFigurePosition, figure);

    if (e.keyCode === 40) {
      setIntervalHandler();
    }
  }

  function moveDown(figure) {
    while (!isTimeToStop(figure)) {
      figure = nextLevelY(figure);
    }

    return figure;
  }

  function clearCompletedLines(fieldCells) {
    let howManyLines = 0;

    for (let y = FIELD_HIEGHT - 1; y >= 0; y--) {
      const row = fieldCells[y];
      if (row.every(block => block.isEmpty)) {
        howManyLines++;
        const startY = y;
        for (let i = startY; i >= 1; i--) {
          for (let j = 0; j < FIELD_WIDTH; j++) {
            fieldCells[i][j].isEmpty = fieldCells[i - 1][j].isEmpty;
            fieldCells[i][j].color = fieldCells[i - 1][j].color;
          }
        }
        y++;
      }
    }

    setScore(previousScrore => previousScrore + 8 * howManyLines);

    return fieldCells;
  }
}
