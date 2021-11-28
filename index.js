//var sensor = require("node-dht-sensor");
var mqtt = require("mqtt");
var client = mqtt.connect("ws://18.191.187.178:9001", {
  //open connection with your broker in AWS via websocket
  username:"iot", //authenticate your broker with username and password
  password:"root",
});

 function timer(temp, humid) {
      client.publish(
        "mqtt/dht",
        JSON.stringify(`hello world`) //convert number to string
      ); //publish sensor data to broker on topic mqtt/dht

      console.log("topic published to the broker");
  }

 setInterval(timer, 5000, 12, 100); // send sensor data to broker every 5 seconds

