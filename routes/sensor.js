const express = require("express");
const router = express.Router();

const sensorController = require("../controllers/sensor");

router.get("/", sensorController.getSensorData);

module.exports = router;
