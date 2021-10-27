require("dotenv").config();
const mongoose = require("mongoose");

//UncaughtException Error handling
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  process.exit();
});
const app = require("./app");

//Database Connection
mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async function () {
  console.log("connected");
});

//server start
const server = app.listen(8080, () => {
  console.log("server started port 8080");
});

//Unhandled Rejection Error handling
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
