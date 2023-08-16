const app = require("./src/app");
const connectDB = require("./src/config/db");
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const path = require("path");

app.use(express.static(__dirname, "build"));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "build/index.html"));
// });

app.listen(PORT, async () => {
  console.log(`server is running`);
  await connectDB();
});
