import { useState, useEffect, useRef, useCallback } from "react";

const MAX_FPS = 60;

export default function useFPS(): number {
  const [fps, setFps] = useState(MAX_FPS);
  const timestampRef = useRef(0);

  const calcFPS = useCallback((timestamp: number): number => {
    if (timestampRef.current === 0) {
      timestampRef.current = timestamp;
      return MAX_FPS;
    }
    const f = Math.floor(1000 / (timestamp - timestampRef.current));
    timestampRef.current = timestamp;
    return f;
  }, []);

  useEffect(() => {
    let timer = 0;
    const update = (t: number) => {
      setFps(calcFPS(t));
      timer = window.requestAnimationFrame((time) => {
        update(time);
      });
    };
    update(0);

    return () => cancelAnimationFrame(timer);
  }, [calcFPS]);

  return fps;
}
