import "@pages/popup/Popup.css";
import withSuspense from "@src/shared/hoc/withSuspense";
import useFPS from "@root/src/shared/hooks/useFPS";

const Popup = () => {
  const fps = useFPS();
  return (
    <div className="App">
      <header className="App-header">
        <p className="text-lime-400">FPS: {fps}</p>
      </header>
    </div>
  );
};

export default withSuspense(Popup);
