/* eslint-disable import/no-dynamic-require */
const express = require("express");

const app = express();

const port = 3000;
app.listen(port, () => console.log(`app listening on port ${port}!`));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const sensor = require("./routes/sensor.js");

app.use("/api/sensor", sensor);

module.exports = app;
