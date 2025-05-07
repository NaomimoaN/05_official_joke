import React from "react"; // Reactをインポート
import "./App.css";
import RandomJokes from "./components/RandomJokes";
import CreatePlaylist from "./components/CreatePlaylist";
import Playlist from "./components/Playlist";
function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>Joke API</h1>
      </header>
      <RandomJokes />
      <CreatePlaylist />
      <Playlist />
    </div>
  );
}

export default App;
