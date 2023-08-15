const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "backend_api",
    })
    .then((c) => {
      console.log(`Connected to database ${c.connection.host}`);
    });
};


module.exports = connectDB;
