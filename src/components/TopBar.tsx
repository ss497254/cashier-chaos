import { LivesTracker, formatTime, useGameService } from "gamez";
import { useCountDown } from "gamez/src/hooks/useCountDown";
import { BiSolidStopwatch } from "react-icons/bi";

export function TopBar() {
  const gs = useGameService();
  const { remainingLives } = gs.useGameState();
  const { lives, time } = gs.getCurrLevelDetails();
  const { countDown } = useCountDown(time, () => gs.endSession("timeout"), gs.isSessionEnded());

  return (
    <div className="absolute inset-x-0 top-0 z-50 flex justify-between p-2">
      <div className="px-3 py-1 text-xl font-semibold text-white rounded-xl bg-zinc-800/50">
        Level {gs.getCurrLevel() + 1}
      </div>
      <div className="flex items-center gap-2 px-3 py-1 text-xl font-bold text-white rounded-xl bg-zinc-800/50">
        <BiSolidStopwatch className="size-7" /> {formatTime(countDown)}
      </div>
      <div className="px-3 py-1 text-white rounded-xl bg-zinc-800/50">
        <LivesTracker remainingLives={remainingLives} totalLives={lives} />
      </div>
    </div>
  );
}
