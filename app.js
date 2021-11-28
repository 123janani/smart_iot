/* eslint-disable import/no-dynamic-require */
const express = require("express");

const app = express();

const port = 6000;
app.listen(port, () => console.log(`app listening on port ${port}!`));

app.all("*", function (req, res, next) {
  console.log(req.header("Authorization"));
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,Authorization ,Accept"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Expose-Headers", "Authorization");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Authorization"
  );

  console.log(req.header("Authorization"));
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const sensor = require("./routes/sensor.js");

app.use("/api/sensor", sensor);

module.exports = app;
