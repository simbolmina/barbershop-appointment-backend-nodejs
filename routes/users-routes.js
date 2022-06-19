const express = require("express");
const userController = require("../controllers/users-controller");

const router = express.Router();

router.get("/:uid", userController.getUserById);

module.exports = router;
