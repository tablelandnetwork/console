import fs from "fs";
import express from "express";
import dotenv from "dotenv";

const app = express();
let port = 3000;

try {
  const env = dotenv.config();
  port = env.parsed.PORT;
} catch (e) {}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/", (req, res, next) => {
  res.send(fs.readFileSync("src/app/index.html", "utf-8"));
});

app.use("/", express.static("public"));
