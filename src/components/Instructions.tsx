import { Button } from "gamez";
import { BiSolidLeftArrow } from "react-icons/bi";
import { ASSETS } from "../constants";

interface StartPageProps {
  onStart?: () => void; // function to run when start button is played
}

export function Instructions(props: StartPageProps) {
  const onBack = () => {
    // TODO - implement back button
  };

  return (
    <div
      className="flex flex-col w-full h-full overflow-hidden bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${ASSETS.background})` }}
    >
      <div className="z-50 flex flex-row justify-between w-full p-3 text-2xl font-semibold tracking-wider text-center text-white bg-gradient-to-b to-violet-800 from-violet-400 md:text-5xl md:p-6">
        <button onClick={onBack}>
          <BiSolidLeftArrow className="size-8" />
        </button>
        <p>Cashier Chaos</p>
        <div />
      </div>

      <div className="relative flex flex-col items-center justify-center w-full h-full px-8 text-center md:px-16">
        <div className="flex flex-col items-center p-6 bg-opacity-50 bg-white/70 rounded-3xl">
          <h1 className="mb-2 text-2xl font-bold md:text-5xl">Instructions</h1>
          <p className="mx-6 text-lg md:mx-16 md:text-3xl">
            Play as a cashier and accurately give customers their change! But watch out for faulty cash registers,
            tricky calculations, and a ticking timer! Can you handle the pressure?
          </p>

          <h1 className="mt-8 mb-2 text-2xl font-bold md:text-5xl">Target Domains</h1>
          <p className="mx-6 text-lg md:mx-16 md:text-3xl">
            Executive function, Working Memory, Planning, Processing Speed
          </p>

          <Button
            onClick={props.onStart}
            size="lg"
            className="w-64 py-3 mt-12 text-2xl font-semibold bg-gradient-to-b from-violet-400 to-violet-900 rounded-xl"
          >
            Start!
          </Button>
        </div>
      </div>
    </div>
  );
}
