import packageJson from "../package.json";
import GameComponent from "./Game";

// don't change here, edit package.json
export const gameInfo = {
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
};

export default GameComponent;
