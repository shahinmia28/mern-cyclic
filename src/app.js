const express = require("express");
const seedRouter = require("./routers/seedData");
const userRouter = require("./routers/userRouter");
const app = express();
// const bodyParser = require("body-parser");
const orderRouter = require("./routers/orderRouter");
const path = require("path");


const cors = require("cors");
app.use(cors());

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use(express.static(path.join(__dirname, "../client/build")));

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.use("/seed", seedRouter);
app.use("/user", userRouter);
app.use("/user", orderRouter);

module.exports = app;
