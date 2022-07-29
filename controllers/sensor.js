//config
//const db = require("../config");

const mysql = require("mysql");
const moment = require("moment");
//MySQL details
var mysqlConnection = mysql.createConnection({
  host: "++++",
  user: "admin",
  password: "----",
  database: "smart_iot",
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (!err) console.log("Database Connection Established Successfully");
  else console.log("Connection Failed!" + JSON.stringify(err));
});

//var sensor = require("node-dht-sensor");
var mqtt = require("mqtt");
var client = mqtt.connect("ws://18.191.187.178:9001", {
  //open connection with your broker in AWS via websocket
  username: "iot", //authenticate your broker with username and password
  password: "root",
});

const getSensorTemperature = async (req, response, next) => {
  console.log("get 1: ", req.route);

  try {
    console.log("inside try: ");

    await mysqlConnection.query(
      "SELECT * FROM (SELECT * FROM sensorAnalytics where sensorId=1 ORDER BY id DESC LIMIT 40)Var1 ORDER BY id ASC",
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          res.status(500);
        } else {
          console.log("data : ", res);
          const time = [];
          const value = [];
          const action = [];
          for (const i of res) {
            time.push(i.DateTime.substring(0, 24));
            value.push(i.value);
            action.push(i.actionPoint);
          }
          response.status(200).json({ time, value, action });
        }
      }
    );
  } catch (error) {
    response.status(500).json(error);
  }
};

const getSensorHumidity = async (req, response, next) => {
  console.log("get 1: ", req.route);

  try {
    console.log("inside try: ");

    await mysqlConnection.query(
      "SELECT * FROM (SELECT * FROM sensorAnalytics where sensorId=2 ORDER BY id DESC LIMIT 40)Var1 ORDER BY id ASC",
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          res.status(500);
        } else {
          console.log("data : ", res);
          const time = [];
          const value = [];
          const action = [];
          for (const i of res) {
            time.push(i.DateTime.substring(0, 24));
            if (i.value > "70") {
              value.push(i.value);
            } else {
              value.push(i.value);
            }
            action.push(i.actionPoint);
          }
          response.status(200).json({ time, value, action });
        }
      }
    );
  } catch (error) {
    response.status(500).json(error);
  }
};

const getSensorSoil = async (req, response, next) => {
  console.log("get 1: ", req.route);

  try {
    console.log("inside try: ");

    await mysqlConnection.query(
      "SELECT * FROM (SELECT * FROM sensorAnalytics where sensorId=3 ORDER BY id DESC LIMIT 40)Var1 ORDER BY id ASC",
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          res.status(500);
        } else {
          console.log("data : ", res);
          const time = [];
          const value = [];
          const action = [];
          for (const i of res) {
            time.push(i.DateTime.substring(0, 24));
            if (i.value === "on") {
              value.push("1");
            } else {
              value.push("0");
            }

            action.push(i.actionPoint);
          }
          response.status(200).json({ time, value, action });
        }
      }
    );
  } catch (error) {
    response.status(500).json(error);
  }
};

const getSensorLight = async (req, response, next) => {
  console.log("get 1: ", req.route);

  try {
    console.log("inside try: ");

    await mysqlConnection.query(
      "SELECT * FROM (SELECT * FROM sensorAnalytics where sensorId=4 ORDER BY id DESC LIMIT 40)Var1 ORDER BY id ASC",
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          res.status(500);
        } else {
          console.log("data : ", res);
          const time = [];
          const value = [];
          const action = [];
          for (const i of res) {
            time.push(i.DateTime.substring(0, 24));
            if (i.value > 120) {
              value.push(i.value);
            } else {
              value.push(i.value);
            }
            action.push(i.actionPoint);
          }
          response.status(200).json({ time, value, action });
        }
      }
    );
  } catch (error) {
    response.status(500).json(error);
  }
};

const saveTemperature = async value => {
  try {
    //const date = new Date().toLocaleDateString();
    const date = new Date();
    let action = 0;
    if (value > 26) {
      action = 1;
      function timer() {
        client.publish("mqtt/dht11_temperature/ack", "on"); //convert number to string
        //publish sensor data to broker on topic mqtt/dht
        console.log("topic published to the broker-on");
      }
      timer();
      // setInterval(timer, 5000, 12, 100); // send sensor data to broker every 5 seconds
      //insert to actuator=1
    }
    console.log("data2", "inside temperature");
    var sql = `INSERT INTO sensorAnalytics (sensorId,DateTime,value,actionPoint) VALUES (1,"${date}","${value}",${action})`;

    await mysqlConnection.query(sql, function (error, results, fields) {
      if (error) throw error;
      console.log(results.insertId);
    });
    console.log("data3");

    //insert to actuator=0
    if (action === 1) {
      var sql1 = `INSERT INTO ActuatorUpTime (StartTime,StopTime,EnergyUsage,ActuatorId) VALUES ("${date}",null,null,1)`;

      await mysqlConnection.query(sql1, function (error, results, fields) {
        if (error) throw error;
        console.log(results.insertId);
      });
      console.log("data4");
    } else {
      function timer() {
        client.publish("mqtt/dht11_temperature/ack", "off"); //convert number to string
        //publish sensor data to broker on topic mqtt/dht
        console.log("topic published to the broker-off");
      }
      timer();

      var ids = `SELECT 
                    MAX(id) AS id
                FROM
                    ActuatorUpTime
                WHERE
                    ActuatorId = 1`;
      console.log("ids", ids);

      await mysqlConnection.query(ids, (err, res) => {
        if (err) {
          console.log("error: ", err);
          res.status(500);
        } else {
          console.log("data : ", res);
          var sql2 = `UPDATE ActuatorUpTime SET StopTime="${date}" ,EnergyUsage=5 WHERE id IN (${res[0].id})`;

          mysqlConnection.query(sql2, function (error, results, fields) {
            if (error) throw error;
            console.log(results.insertId);
          });
        }
      });
    }
    return true;
  } catch (error) {
    console.log("error", error);
  }
};

const saveHumidity = async value => {
  const date = new Date();
  let action = 0;
  if (value > "50") {
    action = 1;
    function timer() {
      client.publish("mqtt/dht11_humidity/ack", "on"); //convert number to string
      //publish sensor data to broker on topic mqtt/dht
      console.log("topic published to the broker");
    }
    timer();
    // setInterval(timer, 5000, 12, 100); // send sensor data to broker every 5 seconds
    //insert to actuator=1
  }
  console.log("data2");
  var sql = `INSERT INTO sensorAnalytics (sensorId,DateTime,value,actionPoint) VALUES (2,"${date}","${value}",${action})`;
  mysqlConnection.query(sql, function (err, result) {
    console.log("data4");
    if (err) throw err;
    console.log("1 record inserted", result);
  });
  //insert to actuator=0
  if (action === 1) {
    var sql1 = `INSERT INTO ActuatorUpTime (StartTime,StopTime,EnergyUsage,ActuatorId) VALUES ("${date}",null,null,2)`;

    await mysqlConnection.query(sql1, function (error, results, fields) {
      if (error) throw error;
      console.log(results.insertId);
    });
    console.log("data4");
  } else {
    function timer() {
      client.publish("mqtt/dht11_humidity/ack", "off"); //convert number to string
      //publish sensor data to broker on topic mqtt/dht
      console.log("topic published to the broker-off");
    }
    timer();

    var ids = `SELECT 
                    MAX(id) AS id
                FROM
                    ActuatorUpTime
                WHERE
                    ActuatorId = 2`;
    console.log("ids", ids);

    await mysqlConnection.query(ids, (err, res) => {
      if (err) {
        console.log("error: ", err);
        res.status(500);
      } else {
        console.log("data : ", res);
        var sql2 = `UPDATE ActuatorUpTime SET StopTime="${date}" ,EnergyUsage=5 WHERE id IN (${res[0].id})`;

        mysqlConnection.query(sql2, function (error, results, fields) {
          if (error) throw error;
          console.log(results.insertId);
        });
      }
    });
  }
  return true;
};

const saveSoilMoisture = async value => {
  const date = new Date();
  let action = 0;
  if (value === "on") {
    action = 1;
    function timer() {
      client.publish("mqtt/soil/ack", "on"); //convert number to string
      //publish sensor data to broker on topic mqtt/dht
      console.log("topic published to the broker");
    }
    timer();
    // setInterval(timer, 5000, 12, 100); // send sensor data to broker every 5 seconds
    //insert to actuator=1
  }
  console.log("data2");
  var sql = `INSERT INTO sensorAnalytics (sensorId,DateTime,value,actionPoint) VALUES (3,"${date}","${value}",${action})`;
  mysqlConnection.query(sql, function (err, result) {
    console.log("data4", value);
    if (err) throw err;
    console.log("1 record inserted", result);
  });
  //insert to actuator=0
  if (action === 1) {
    var sql1 = `INSERT INTO ActuatorUpTime (StartTime,StopTime,EnergyUsage,ActuatorId) VALUES ("${date}",null,null,3)`;

    await mysqlConnection.query(sql1, function (error, results, fields) {
      if (error) throw error;
      console.log(results.insertId);
    });
    console.log("data4");
  } else {
    function timer() {
      client.publish("mqtt/soil/ack", "off"); //convert number to string
      //publish sensor data to broker on topic mqtt/dht
      console.log("topic published to the broker-off");
    }
    timer();

    var ids = `SELECT 
                    MAX(id) AS id
                FROM
                    ActuatorUpTime
                WHERE
                    ActuatorId = 3`;
    console.log("ids", ids);

    await mysqlConnection.query(ids, (err, res) => {
      if (err) {
        console.log("error: ", err);
        res.status(500);
      } else {
        console.log("data : ", res);
        var sql2 = `UPDATE ActuatorUpTime SET StopTime="${date}" ,EnergyUsage=5 WHERE id IN (${res[0].id})`;

        mysqlConnection.query(sql2, function (error, results, fields) {
          if (error) throw error;
          console.log(results.insertId);
        });
      }
    });
  }
  return true;
};

const saveLightSensor = async value => {
  const date = new Date();
  let action = 0;
  if (value < 120) {
    action = 1;
    function timer() {
      client.publish("mqtt/lux/ack", "on"); //convert number to string
      //publish sensor data to broker on topic mqtt/dht
      console.log("topic published to the broker");
    }
    timer();
    // setInterval(timer, 5000, 12, 100); // send sensor data to broker every 5 seconds
    //insert to actuator=1
  }
  console.log("data2");
  var sql = `INSERT INTO sensorAnalytics (sensorId,DateTime,value,actionPoint) VALUES (4,"${date}","${value}",${action})`;
  mysqlConnection.query(sql, function (err, result) {
    console.log("data4");
    if (err) throw err;
    console.log("1 record inserted", result);
  });
  //insert to actuator=0
  if (action === 1) {
    var sql1 = `INSERT INTO ActuatorUpTime (StartTime,StopTime,EnergyUsage,ActuatorId) VALUES ("${date}",null,null,4)`;

    await mysqlConnection.query(sql1, function (error, results, fields) {
      if (error) throw error;
      console.log(results.insertId);
    });
    console.log("data4");
  } else {
    function timer() {
      client.publish(
        "mqtt/lux/ack",
        "off" //convert number to string
      ); //publish sensor data to broker on topic mqtt/dht
      console.log("topic published to the broker-off");
    }
    timer();

    var ids = `SELECT 
                    MAX(id) AS id
                FROM
                    ActuatorUpTime
                WHERE
                    ActuatorId = 4`;
    console.log("ids", ids);

    await mysqlConnection.query(ids, (err, res) => {
      if (err) {
        console.log("error: ", err);
        res.status(500);
      } else {
        console.log("data : ", res);
        var sql2 = `UPDATE ActuatorUpTime SET StopTime="${date}" ,EnergyUsage=5 WHERE id IN (${res[0].id})`;

        mysqlConnection.query(sql2, function (error, results, fields) {
          if (error) throw error;
          console.log(results.insertId);
        });
      }
    });
  }
  return true;
};

const saveSensorData = async (req, response, next) => {
  console.log("data1");
  try {
    console.log("data for testing: ", req.query);
    const id = parseInt(req.query.sensorID);
    const value = req.query.value;
    console.log("value================", value);

    if (id === 1) {
      saveTemperature(value);
    } else if (id === 2) {
      saveHumidity(value);
    } else if (id === 3) {
      saveSoilMoisture(value);
    } else if (id === 4) {
      saveLightSensor(value);
    }
    response.status(200).json("saved sensor and actuator data");
  } catch (error) {
    response.status(500).json(error);
  }
};

module.exports = {
  getSensorTemperature,
  getSensorHumidity,
  getSensorSoil,
  getSensorLight,
  saveSensorData,
};
