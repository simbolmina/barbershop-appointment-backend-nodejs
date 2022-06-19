const express = require("express");
const appointmentController = require("../controllers/appointments-controller");

const router = express.Router();

router.get("/:aid", appointmentController.getAppointmentById);

module.exports = router;
