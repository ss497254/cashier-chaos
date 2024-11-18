import { CenterLoading, GameServiceProps, GameServiceWrapper, useComponentRefresh } from "gamez";
import { useState, useEffect } from "react";
import { CashierChaos, emptyCash } from "./CashierChaos";

function GameComponent({ gs }: GameServiceProps) {
  const [isGameReady, setIsGameReady] = useState(false);
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

        gs.addSessionEndListner(async (result) => {
          // do something when the session ends (e.g., display results, save data)
          const report = await gs.collectReport({
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

  if (!isGameReady) {
    return <CenterLoading />;
  }

  return (
    <GameServiceWrapper gs={gs}>
      <CashierChaos />
    </GameServiceWrapper>
  );
}

// whatever you do just make sure you export this
export default GameComponent;
