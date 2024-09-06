import { createBrowserRouter } from "react-router-dom";
import { StartPage } from "./pages/StartPage";
import { Tetris } from "./pages/Tetris";

export const router = createBrowserRouter([
  { path: "*", element: <StartPage /> },
  { path: "tetris", element: <Tetris /> }
]);
