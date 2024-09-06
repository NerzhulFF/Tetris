import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

export function LostModal({ setIsLost, reStartTetris }) {
  return createPortal(
    <div id="modal-lost-container">
      <div>
        <h1>You Lost!</h1>
        <Link
          to="/tetris"
          className="button"
          onClick={() => {
            setIsLost(false);
            reStartTetris();
          }}
        >
          Try Again
        </Link>
      </div>
    </div>,
    document.querySelector("#modal-lost")
  );
}
