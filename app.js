const express = require("express");
const bodyParser = require("body-parser");
const HttpError = require("./models/http-error");

const appointmentRouter = require("./routes/appointments-routes");
const userRouter = require("./routes/users-routes");

const app = express();

app.use(bodyParser.json());

app.use("/api/apps", appointmentRouter);
app.use("/api/users", userRouter);

//error handler for unsupported routes
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

//global error handler

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred" });
});

app.listen(5000, () => {
  console.log("app running on port 5000");
});
