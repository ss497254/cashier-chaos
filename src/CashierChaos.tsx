import { motion } from "framer-motion";
import { getRandomNum, useGameService } from "gamez";
import { useResult } from "gamez/src/hooks/useResult";
import { useEffect, useMemo } from "react";
import { Highlight } from "./components/Highlight";
import { TopBar } from "./components/TopBar";
import "./styles/game.css";

const HUNDREDS = [20, 10, 5, 2];
const CENTS = [1, 0.5, 0.2, 0.1];

function getAmount(multiple: number) {
  let hundreds = getRandomNum(100, 1);

  if (multiple >= 1) {
    return {
      hundreds: hundreds - (hundreds % multiple),
      cents: 0,
    };
  }

  return {
    hundreds,
    cents: (Math.round(Math.random() * 100) * 10) % 100,
  };
}

export function emptyCash() {
  return {
    ...Object.fromEntries(HUNDREDS.map((x) => [x, 0])),
    ...Object.fromEntries(CENTS.map((x) => [x, 0])),
  };
}

/**
 * YourGame is a React component that represents a game.
 * This a sample game component
 */
export function CashierChaos() {
  const gs = useGameService();
  const { cash, customer, remainingLives } = gs.useGameState();
  const { result, setResult, resetResult } = useResult();

  useEffect(() => {
    if (!result) return;

    setTimeout(() => {
      if (result === "success") {
        if (customer === 4) return gs.endSession("success");

        gs.updateState({ customer: customer + 1, cash: emptyCash() });
      } else if (result === "error") {
        if (remainingLives === 1) return gs.endSession("error");

        gs.updateState({ remainingLives: remainingLives - 1 });
      }

      resetResult();
    }, 1000);
  }, [result]);

  const { multiple, cashRegisterWorking } = gs.getCurrLevelDetails();

  const customerSrc = useMemo(() => gs.assets[`person${getRandomNum(8, 1)}_${getRandomNum(4, 1)}`], [customer]);
  const { hundreds, cents } = useMemo(() => getAmount(multiple), [customer]);
  const borrow = cents > 0 ? 1 : 0;

  return (
    <div className="relative flex flex-col w-full h-full overflow-y-auto">
      {result && (
        <img
          className="absolute top-0 bottom-0 left-0 right-0 z-20 mx-auto my-auto size-40 md:scale-125 lg:scale-150"
          src={result === "success" ? gs.assets.right : gs.assets.wrong}
        />
      )}

      <TopBar />

      <div
        className="relative flex flex-col items-center justify-center flex-grow overflow-hidden"
        style={{
          backgroundImage: `url(${gs.assets.background})`,
        }}
      >
        <img src={customerSrc} className="absolute right-[5%] h-1/2 bottom-[10%]" />

        <div className="absolute bottom-0 left-0 w-1/2">
          <img src={gs.assets.cashRegister} className="-mb-1" />

          <div className="absolute top-[12%] left-[12%] text-lg text-white font-medium">
            <p>Received: </p>
            <p>Total: </p>
            <p className={cashRegisterWorking ? "text-yellow-500" : "text-red-400"}>Change: </p>
          </div>
          <div className="absolute top-[12%] right-[12%] text-right text-lg text-white font-medium">
            <p>$100.00</p>
            <p>
              ${100 - hundreds - borrow}.{borrow * 100 - cents}
            </p>
            <p className={cashRegisterWorking ? "text-yellow-500" : "text-red-400"}>
              {cashRegisterWorking ? `$${hundreds}.${cents}` : "ERROR!"}
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 w-1/2">
          <img src={gs.assets.whiteTray} className="scale-[1.4]" />

          <div id="gs-money-counter" className="absolute inset-y-0 z-10 flex h-5 gap-1 p-1 md:gap-4 lg:gap-6">
            {HUNDREDS.map((x) => (
              <button
                key={x}
                className="relative w-10 md:w-24 lg:w-28"
                onClick={() => gs.updateState({ cash: { ...cash, [x]: cash[x] - 1 } })}
                style={{ display: cash[x] ? undefined : "none" }}
              >
                <img
                  className="absolute"
                  src={gs.assets["dollar_" + x]}
                  style={{ display: cash[x] - 1 ? undefined : "none" }}
                />
                <Highlight num={cash[x]} />
                <motion.img key={`${x}-${cash[x]}`} layoutId={`${x}-${cash[x]}`} src={gs.assets["dollar_" + x]} />
              </button>
            ))}

            <div className="flex flex-col items-center ml-auto justify-evenly">
              {CENTS.map((x) => (
                <button
                  key={x}
                  className="relative"
                  onClick={() => gs.updateState({ cash: { ...cash, [x]: cash[x] - 1 } })}
                  style={{ display: cash[x] ? undefined : "none" }}
                >
                  <img
                    className="absolute"
                    src={gs.assets["cent_" + x * 100]}
                    style={{
                      height: (x * 100) / 20 + 25,
                      display: cash[x] - 1 ? undefined : "none",
                    }}
                  />
                  <Highlight num={cash[x]} />
                  <motion.img
                    key={`${x}-${cash[x]}`}
                    layoutId={`${x}-${cash[x]}`}
                    src={gs.assets["cent_" + x * 100]}
                    style={{ height: (x * 100) / 20 + 25 }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="py-4 bg-sky-800 md:py-6 lg:py-10">
        <div className="grid grid-cols-4 gap-2 px-4 py-2 mx-auto mb-2 tall:py-4 w-fit">
          {HUNDREDS.map((x) => (
            <button
              key={x}
              className="bg-[#303A43] pt-2 px-1 w-20 h-[185px] md:h-56 md:w-24 lg:w-28 lg:h-64 relative"
              onClick={() => gs.updateState({ cash: { ...cash, [x]: cash[x] + 1 } })}
            >
              <img src={gs.assets["dollar_" + x]} className="absolute w-[72px] md:w-[88px] lg:w-[104px]" />
              <motion.img key={`${x}-${cash[x] + 1}`} layoutId={`${x}-${cash[x] + 1}`} src={gs.assets["dollar_" + x]} />
            </button>
          ))}

          {CENTS.map((x) => (
            <button
              key={x}
              className="bg-[#303A43] size-20 flex justify-center items-center pt-2 relative md:size-24 lg:size-28"
              onClick={() => gs.updateState({ cash: { ...cash, [x]: cash[x] + 1 } })}
            >
              <img src={gs.assets["cent_" + x * 100]} className="absolute size-16 md:size-20 lg:size-24" />
              <motion.img
                key={`${x}-${cash[x] + 1}`}
                layoutId={`${x}-${cash[x] + 1}`}
                className="relative size-16 md:size-20 lg:size-24"
                src={gs.assets["cent_" + x * 100]}
              />
            </button>
          ))}
        </div>

        <button
          className="block pt-1 pb-2 mx-auto text-xl font-bold text-white bg-green-600 shadow-xl rounded-xl w-80 md:scale-125 lg:scale-150"
          onClick={() => {
            const a_hundreds = [20, 10, 5, 2, 1].map((x) => cash[x] * x).reduce((a, b) => a + b);
            const a_cents = [0.5, 0.2, 0.1].map((x) => Math.round(cash[x] * x * 100)).reduce((a, b) => a + b);

            if (a_cents === cents && a_hundreds === hundreds) setResult("success");
            else setResult("error");
          }}
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
}
