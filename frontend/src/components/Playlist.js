import React, { useState, useEffect } from "react";
import axios from "axios";

const Playlist = ({playlists, loading, error}) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ color: "red", padding: "20px" }}>
        <h3>Error occurred</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Playlist List</h1>
      {playlists.length === 0 ? (
        <p>No playlists</p>
      ) : (
        <div style={{ display: "grid", gap: "20px" }}>
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              style={{
                padding: "15px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h2>{playlist.name}</h2>
              <p>{playlist.description}</p>
              <span style={{ color: "#666" }}>
                Visibility: {playlist.visibility}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Playlist;
