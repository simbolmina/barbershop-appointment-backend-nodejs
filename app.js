const express = require("express");
const bodyParser = require("body-parser");

const appointmentRouter = require("./routes/appointments-routes");
const userRouter = require("./routes/users-routes");

const app = express();

app.use("/api/apps", appointmentRouter);
app.use("/api/users", userRouter);

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
