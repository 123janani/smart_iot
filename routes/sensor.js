const express = require("express");
const router = express.Router();

const sensorController = require("../controllers/sensor");

router.get("/temperature", sensorController.getSensorTemperature);
router.get("/humidity", sensorController.getSensorHumidity);

router.get("/soil", sensorController.getSensorSoil);

router.get("/light", sensorController.getSensorLight);


router.get("/temp/", sensorController.saveSensorData);

module.exports = router;
