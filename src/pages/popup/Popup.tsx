import logo from "@assets/img/logo.svg";
import "@pages/popup/Popup.css";
import withSuspense from "@src/shared/hoc/withSuspense";
import useFPS from "@root/src/shared/hooks/useFPS";

const Popup = () => {
  const fps = useFPS();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="text-lime-400">FPS: {fps}</p>
      </header>
    </div>
  );
};

export default withSuspense(Popup);
