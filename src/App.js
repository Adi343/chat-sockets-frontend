import ChatWindow from "./ChatWindow";
import "./App.css";

function App() {
  return (
    <div class="container">
      <div className="container--sidebar" />

      <div className="container--main">
        <ChatWindow />
      </div>
      <div className="container--sidebar" />
    </div>
  );
}

export default App;
