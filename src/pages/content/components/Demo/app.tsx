import { useEffect, useState } from "react";
import { FpsView } from "react-fps";

export default function App() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const fn = function (request) {
      if (request.message === "toggle-action") {
        setShown(!shown);
      }
    };
    chrome.runtime.onMessage.addListener(fn);
    return () => chrome.runtime.onMessage.removeListener(fn);
  }, [shown]);

  return shown && <FpsView left="auto" bottom="auto" right={12} top={12} />;
}
