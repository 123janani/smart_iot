//config
const db = require("../config");

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
    res.status(500).json(error);
  }
};

module.exports = {
  getSensorData,
};
