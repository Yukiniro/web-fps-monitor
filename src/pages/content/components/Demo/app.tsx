import useFPS from "@root/src/shared/hooks/useFPS";
import { useEffect, useState } from "react";

export default function App() {
  const fps = useFPS();
  const [shown, setShown] = useState(true);

  useEffect(() => {
    const fn = function (request) {
      console.log(request);
      if (request.message === "toggle-action") {
        setShown(!shown);
      }
    };
    chrome.runtime.onMessage.addListener(fn);
    return () => chrome.runtime.onMessage.removeListener(fn);
  }, []);

  return (
    shown && (
      <div className="fixed top-0 right-0 w-[120px] h-[60px] bg-white text-black z-[99999999999999] flex items-center justify-center text-3xl opacity-80">
        {fps} FPS
      </div>
    )
  );
}
