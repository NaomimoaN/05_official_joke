import React, { useState } from "react";
import axios from "axios";

const CreatePlaylist = ({ onCreatePlayList }) => {
  const [playListName, setPlayListName] = useState("");
  const [playListDescription, setPlayListDescription] = useState("");
  const [playListVisibility, setPlayListVisibility] = useState("public");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(playListName, playListDescription, playListVisibility);

    const playList = {
      name: playListName,
      description: playListDescription,
      visibility: playListVisibility,
    };

    axios
      .post("http://localhost:3005/playlists", playList)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    onCreatePlayList(playList);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Playlist Name</label>
        <input
          type="text"
          value={playListName}
          onChange={(e) => setPlayListName(e.target.value)}
          placeholder="Playlist Name"
          required
        ></input>
        <label>Playlist Description</label>
        <textarea
          type="text"
          value={playListDescription}
          onChange={(e) => setPlayListDescription(e.target.value)}
          placeholder="Playlist Description"
        ></textarea>
        <button type="submit">Create Playlist</button>
      </form>
      <button onClick={() => setPlayListVisibility("public")}>Public</button>
      <button onClick={() => setPlayListVisibility("private")}>Private</button>
    </div>
  );
};

export default CreatePlaylist;
