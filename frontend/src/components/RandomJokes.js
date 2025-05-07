import React, { useState, useEffect } from "react";
import axios from "axios";

const RandomJokes = () => {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://official-joke-api.appspot.com/jokes/random/25")
      .then((response) => {
        setJokes(response.data.slice(0, 6)); // 最初の6つのジョークを取得
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch jokes");
        setLoading(false);
        console.log(err);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Random Jokes</h2>
      <button onClick={() => window.location.reload()}>Refresh</button>
      <ul>
        {jokes.map((joke) => (
          <li key={joke.id}>
            <p>
              <strong>Setup:</strong> {joke.setup}
            </p>
            <p>
              <strong>Punchline:</strong> {joke.punchline}
            </p>
            <p>
              <strong>Type:</strong> {joke.type}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RandomJokes;
