import { CenterLoading, GameServiceProps, GameServiceWrapper, useComponentRefresh } from "gamez";
import { useEffect, useState } from "react";
import { CashierChaos, emptyCash } from "./CashierChaos";
import { Instructions } from "./components/Instructions";

let isInstructionsShownAlready = false;

function GameComponent({ gs }: GameServiceProps) {
  const [isGameReady, setIsGameReady] = useState(false);
  const [showInstructions, setShowInstruction] = useState(!isInstructionsShownAlready);
  const refresh = useComponentRefresh();

  useEffect(() => {
    // wait for assets to be loaded
    gs.preloadAssets()
      .then(() => {
        // start the session when assets are ready
        gs.startSession();

        gs.initState({
          customer: 0,
          remainingLives: gs.getCurrLevelDetails().lives,
          cash: emptyCash(),
        });

        gs.addSessionEndListner((result) => {
          // do something when the session ends (e.g., display results, save data)
          const report = gs.collectReport({
            level: gs.getCurrLevel(),
            result,
          });

          gs.saveReport(report);
          if (result === "success") gs.nextLevel();

          alert(result);
          refresh();
        });

        setIsGameReady(true);
      })
      .catch(() => {
        // handle asset loading error
        alert("error");
      });

    return () => {
      // reset the game when component unmounts
      gs.resetSession();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (showInstructions) {
    return <Instructions onStart={() => (setShowInstruction(false), (isInstructionsShownAlready = true))} />;
  } else if (!isGameReady) {
    return <CenterLoading />;
  } else if (gs.isGameComplete()) {
    return <h1>Game Over!</h1>;
  }

  return (
    <GameServiceWrapper gs={gs}>
      <CashierChaos />
    </GameServiceWrapper>
  );
}

// whatever you do just make sure you export this
export default GameComponent;
