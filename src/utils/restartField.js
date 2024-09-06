import { FIELD_HIEGHT, FIELD_WIDTH } from "../logic/gameLogic";

export function restartedField() {
  const cells = [];

  for (let y = 0; y < FIELD_HIEGHT; y++) {
    const row = [];
    for (let x = 0; x < FIELD_WIDTH; x++) {
      const cell = { x, y, isEmpty: false, id: crypto.randomUUID() };
      row.push(cell);
    }
    cells.push(row);
  }

  return cells;
}
