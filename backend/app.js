const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const approvalRouter = require("./routes/approvalRoutes");
const appointmentRouter = require("./routes/appointmentRoutes");
const blogRouter = require("./routes/blogRoutes");
const commentRouter = require("./routes/commentRoutes");
const qaRouter = require('./routes/qaRoutes')
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();
app.use(express.json());
app.use(express.static("img/consumers"));
app.use(express.static("img/blogs"));
app.use(express.static("img/professionals"));
app.use(express.static("img/blogs"));


// Cross-Origin Resource Sharing middleware
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

//REST Architecture
app.use("/api/users", userRouter);
app.use("/api/approvals", approvalRouter);
app.use("/api/appointments", appointmentRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/comments", commentRouter);
app.use("/api/qa", qaRouter);
//Error Handling for all undefined routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//Global Error handler
app.use(globalErrorHandler);

module.exports = app;
