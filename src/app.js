const express = require("express");
const seedRouter = require("./routers/seedData");
const userRouter = require("./routers/userRouter");
const app = express();
const bodyParser = require("body-parser");
const orderRouter = require("./routers/orderRouter");
const path = require("path");
// const { fileURLToPath } = require("url");

const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "./client/build")));

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.use("/seed", seedRouter);
app.use("/user", userRouter);
app.use("/user", orderRouter);

module.exports = app;
