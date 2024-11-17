import { GameService } from "gamez";
import { createRoot } from "react-dom/client";
import GameComponent from "./Game";
import { ASSETS, LEVELS } from "./constants";
import "./styles/globals.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

const gs = new GameService("cashier-chaos", LEVELS, ASSETS);

root.render(<GameComponent gs={gs} />);
