const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

// Cross-Origin Resource Sharing middleware
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("hoooas");
});
module.exports = app;
