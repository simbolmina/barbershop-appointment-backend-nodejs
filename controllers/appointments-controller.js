const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");

let DUMMY_DATA = [
  {
    id: "a1",
    date: "2021-06-19",
    time: "08:30",
    type: "sac",
    note: " ",
    creator: "u1",
  },
  {
    id: "a2",
    date: "2021-06-19",
    time: "08:30",
    type: "sakal",
    note: " ",
    creator: "u1",
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

exports.getAppointmentsByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const appointments = DUMMY_DATA.filter((user) => user.creator === userId);

  if (!appointments || appointments.length === 0) {
    return next(
      new HttpError("Could not find any appointment with provided user id", 404)
    );
  }

  res.json({ appointments });
};

exports.createAppointment = (req, res, next) => {
  const { date, time, type, note } = req.body;

  const createdAppointment = {
    id: uuidv4(),
    date,
    time,
    type,
    note,
  };

  DUMMY_DATA.push(createdAppointment);

  res.status(201).json({ createdAppointment });
};

exports.updateAppointment = (req, res, next) => {
  const appId = req.params.aid;
  const { date, time, type, note } = req.body;
  const appointment = { ...DUMMY_DATA.find((aid) => aid.id === appId) };
  const appointmentIndex = DUMMY_DATA.findIndex((aid) => aid.id === appId);

  appointment.date = date;
  appointment.time = time;
  appointment.type = type;
  appointment.note = note;

  DUMMY_DATA[appointmentIndex] = appointment;

  res.status(200).json({
    status: "success",
    data: appointment,
  });
};

exports.deleteAppointment = (req, res, next) => {
  const appId = req.params.aid;
  DUMMY_DATA = DUMMY_DATA.filter((a) => a.id !== appId);

  res.status(200).json({ message: "Appointment is deleted" });
};
