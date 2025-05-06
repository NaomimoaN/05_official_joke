import React from "react"; // Reactをインポート
import "./App.css";
import RandomJokes from "./components/RandomJokes";

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>Joke API</h1>
      </header>
      <RandomJokes />
    </div>
  );
}

export default App;
