const express = require("express");
const app = express();

const seedRouter = require("./routers/seedData");
const userRouter = require("./routers/userRouter");
const orderRouter = require("./routers/orderRouter");

const path = require("path");
const connectDB = require("./config/db");

require("dotenv").config({ path: "./config.env" });

const PORT = process.env.PORT || 3001;

const cors = require("cors");
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "./build")));

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

// app.get("/", (req, res) => {
//   res.send("hello");
// });

app.use("/seed", seedRouter);
app.use("/user", userRouter);
app.use("/user", orderRouter);

app.listen(PORT, async () => {
  console.log(`server is running`);
  await connectDB();
});
