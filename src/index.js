const express = require("express");
const app = express();

const seedRouter = require("./routers/seedData");
const userRouter = require("./routers/userRouter");
const orderRouter = require("./routers/orderRouter");

const path = require("path");
const connectDB = require("../src/config/db");

require("dotenv").config({ path: "./config.env" });

const PORT = process.env.PORT || 3001;

const cors = require("cors");
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "../build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../buildindex.html"));
});

app.use("/seed", seedRouter);
app.use("/user", userRouter);
app.use("/user", orderRouter);

app.listen(PORT, async () => {
  console.log(`server is running at http://localhost:3001`);
  await connectDB();
});
