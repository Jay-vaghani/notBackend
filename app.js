const express = require("express");
const app = express();
const userRouter = require("./routes/user.js");
const taskRouter = require("./routes/task.js");
const cookieParser = require("cookie-parser");
const cors = require("cors")
const { ErrorMiddleWare } = require("./middleware/error.js");



// Using Middleware 
app.use(express.json());
app.use(cookieParser())

// Using Routes 
app.use(cors({
    origin: [process.env.DOMAIN],
    methods: ["GET", "PUT", "DELETE", "POST"],
    credentials: true
}))
app.use("/users", userRouter);
app.use("/task", taskRouter);

// Error Handler 
app.use(ErrorMiddleWare)


module.exports = app
