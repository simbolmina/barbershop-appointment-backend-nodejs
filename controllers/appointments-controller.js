const HttpError = require("../models/http-error");

const DUMMY_DATA = [
  {
    id: "a1",
    date: "2021-06-19",
    time: "08:30",
    type: "sac",
    note: " ",
  },
  {
    id: "a2",
    date: "2021-06-19",
    time: "08:30",
    type: "sakal",
    note: " ",
  },
];

exports.getAppointmentById = (req, res, next) => {
  const appId = req.params.aid;
  const appointment = DUMMY_DATA.find((aid) => {
    return aid.id === appId;
  });

  if (!appointment) {
    return next(
      new HttpError("Could not find appointment with provided id", 404)
    );
  }
  res.json({ appointment });
};
