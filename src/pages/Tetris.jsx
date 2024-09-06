import { useState } from "react";
import { Link } from "react-router-dom";
import { PlayingField } from "../components/PlayingField";

export function Tetris() {
  const [score, setScore] = useState(0);

  return (
    <>
      <PlayingField setScore={setScore} />
      <div className="container">
        <div className="score">
          <div>YOUR SCORE</div>
          <div className="amount">{score}</div>
        </div>
      </div>
      <Link to="/" className="button back-button">
        Back To Menu
      </Link>
    </>
  );
}
