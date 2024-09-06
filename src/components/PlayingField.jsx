import { useState, useEffect } from "react";
import { Cell } from "./Cell";
import { startMove } from "../logic/gameLogic";
import { restartedField } from "../utils/restartField";
import { LostModal } from "./LostModal";

export function PlayingField({ setScore }) {
  const [fieldCells, setFieldCelss] = useState(restartedField);
  const [isLost, setIsLost] = useState(false);

  const reStartTetris = () => {
    startMove(restartedField, setFieldCelss, setScore, setIsLost);
  };

  useEffect(() => {
    startMove(fieldCells, setFieldCelss, setScore, setIsLost);
  }, []);

  return (
    <>
      {isLost && (
        <LostModal setIsLost={setIsLost} reStartTetris={reStartTetris} />
      )}
      <div className="tetris-field">
        {fieldCells?.map(fieldCellRow => {
          return fieldCellRow.map(cell => {
            return <Cell key={cell.id} {...cell} />;
          });
        })}
      </div>
    </>
  );
}
