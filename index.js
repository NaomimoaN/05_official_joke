const express = require("express");
const LimitingMiddleware = require("limiting-middleware");
const cors = require("cors");
const {
  types,
  randomJoke,
  randomTen,
  randomSelect,
  jokeByType,
  jokeById,
  count,
} = require("./handler");

const app = express();

// CORSの設定（1回だけ）
app.use(cors());

// JSONボディをパースするためのミドルウェア
app.use(express.json());

// IP制限のミドルウェア
app.use(new LimitingMiddleware().limitByIp());

let playlists = [];

app.post("/playlists", (req, res) => {
  console.log("POST /playlists Request received", req.body);
  const { name, description, visibility } = req.body;
  const playlist = { id: playlists.length + 1, name, description, visibility };
  playlists.push(playlist);
  res.json(playlist);
});

app.get("/playlists", (req, res) => {
  console.log("GET /playlists Request received");
  res.json(playlists);
});

app.get("/", (req, res) => {
  res.send(
    "Try /random_joke, /random_ten, /jokes/random, or /jokes/ten , /jokes/random/<any-number>"
  );
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get("/random_joke", (req, res) => {
  res.json(randomJoke());
});

app.get("/random_ten", (req, res) => {
  res.json(randomTen());
});

app.get("/jokes/random", (req, res) => {
  res.json(randomJoke());
});

app.get("/jokes/random/:num", (req, res) => {
  let num;
  try {
    num = parseInt(req.params.num);
    if (!num) {
      res.send("The passed path is not a number.");
    } else {
      if (num > count) {
        res.send(`The passed path exceeds the number of jokes (${count}).`);
      } else {
        res.json(randomSelect(num));
      }
    }
  } catch (e) {
    return next(e);
  }
});

app.get("/jokes/ten", (req, res) => {
  res.json(randomTen());
});

app.get("/jokes/:type/random", (req, res) => {
  res.json(jokeByType(req.params.type, 1));
});

app.get("/jokes/:type/ten", (req, res) => {
  res.json(jokeByType(req.params.type, 10));
});

app.get("/jokes/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const joke = jokeById(+id);
    if (!joke) return next({ statusCode: 404, message: "joke not found" });
    return res.json(joke);
  } catch (e) {
    return next(e);
  }
});

app.get("/types", (req, res, next) => {
  res.json(types);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    type: "error",
    message: err.message,
  });
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
