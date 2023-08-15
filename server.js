const connectDB = require("./db/database.js");
const { config } = require("dotenv");

config({
  path: "./config.env",
});

connectDB();

const app = require("./app");

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
