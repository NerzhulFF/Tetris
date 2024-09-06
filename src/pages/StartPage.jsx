import { Link } from "react-router-dom";

export function StartPage() {
  return (
    <Link to="tetris" className="button">
      Play Tetris!
    </Link>
  );
}
