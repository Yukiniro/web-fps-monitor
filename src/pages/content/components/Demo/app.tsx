import { useEffect, useState } from "react";
import { FpsView } from "react-fps";

export default function App() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const fn = function (request) {
      switch (request.message) {
        case "shown":
          setShown(true);
          break;
        case "hidden":
          setShown(false);
          break;
        default:
      }
    };
    chrome.runtime.onMessage.addListener(fn);
    return () => chrome.runtime.onMessage.removeListener(fn);
  }, [shown]);

  useEffect(() => {
    (async () => {
      try {
        const data = await chrome.storage.local.get(["isActive"]);
        await chrome.runtime.sendMessage({ message: "init" });
        setShown(!!data?.isActive);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return shown && <FpsView left="auto" bottom="auto" right={12} top={12} />;
}
