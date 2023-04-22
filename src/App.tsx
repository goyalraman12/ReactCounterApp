import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [count, setCount] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(true);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setCount((prev: number) => prev + 1);
      }, 1000);
    } else {
      if (interval) {
        clearInterval(interval);
      }
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, isPaused]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsActive(false);
    setCount(0);
  };

  return (
    <>
      <div>{count}</div>
      {!count ? (
        <button onClick={handleStart}>Start</button>
      ) : (
        <button onClick={handlePauseResume}>
          {isPaused ? "Resume" : "Pause"}
        </button>
      )}
      <button onClick={handleReset}>Reset</button>
    </>
  );
}
