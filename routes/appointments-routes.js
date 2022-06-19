const express = require("express");
const appointmentController = require("../controllers/appointments-controller");

const router = express.Router();

router.get("/:aid", appointmentController.getAppointmentById);

router.post("/", appointmentController.createAppointment);
router.patch("/:aid", appointmentController.updateAppointment);
router.delete("/:pid", appointmentController.deleteAppointment);

module.exports = router;
