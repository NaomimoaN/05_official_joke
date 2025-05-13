import React, { useState, useEffect } from "react"; // Reactをインポート
import "./App.css";
import RandomJokes from "./components/RandomJokes";
import CreatePlaylist from "./components/CreatePlaylist";
import Playlist from "./components/Playlist";
import axios from "axios";

function App() {
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPlaylists = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3005/playlists");
      setPlaylists(response.data);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const handleCreatePlayList = (newPlayList => {
    setPlaylists([...playlists, newPlayList])
  })

  return (
    <div className="App">
      <header className="header">
        <h1>Joke API</h1>
      </header>
      <RandomJokes />
      <CreatePlaylist onCreatePlayList={handleCreatePlayList} />
      <Playlist playlists={playlists} loading={loading} error={error} />
    </div>
  );
}

export default App;
