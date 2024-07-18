const express = require("express");
const cors = require("cors");

const getPosts = require("./routes/getPosts");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.use("/", getPosts);

app.listen(PORT, () => {
  console.log(`server listen on port: ${PORT}`);
});
