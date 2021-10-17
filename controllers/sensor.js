//config
const db = require("../config");

var sensor = require("node-dht-sensor");
var mqtt = require("mqtt");
var client = mqtt.connect("ws://18.191.187.178:9001", {
  //open connection with your broker in AWS via websocket
  username: "iot", //authenticate your broker with username and password
  password: "root",
});

const getSensorData = async (req, response, next) => {
  try {
    await db.query("SELECT * FROM sensorAnalytics", (err, res) => {
      if (err) {
        console.log("error: ", err);
        res.status(500);
      } else {
        console.log("data : ", res);
        const time = [];
        const value = [];
        const action = [];
        for (const i of res) {
          time.push(i.DateTime);
          value.push(i.value);
          action.push(i.actionPoint);
        }
        response.status(200).json({ time, value, action });
      }
    });
  } catch (error) {
    response.status(500).json(error);
  }
};

const saveSensorData = async (req, response, next) => {
  console.log("data1");
  try {
    console.log("data : ", req.query);
    const id = parseInt(req.query.id);
    const value = parseInt(req.query.value);

    //const date = Date.now();
    let action = 0;
    // if (value > 50) {
    //   action = 1;

    //   function timer() {
    //     client.publish(
    //       "mqtt/dht",
    //       JSON.stringify(`hello world`) //convert number to string
    //     ); //publish sensor data to broker on topic mqtt/dht

    //     console.log("topic published to the broker");
    //   }
    //   timer();
    //   // setInterval(timer, 5000, 12, 100); // send sensor data to broker every 5 seconds
    // }
    console.log("data2");

    var sql =
      "INSERT INTO sensorAnalytics (sensorId,DateTime,value,actionPoint) VALUES (1,'00:31',35,0)";
    db.query(sql, function (err, result) {
      console.log("data4");

      if (err) throw err;
      console.log("1 record inserted", result);
    });
  } catch (error) {
    response.status(500).json(error);
  }
};

module.exports = {
  getSensorData,
  saveSensorData,
};
