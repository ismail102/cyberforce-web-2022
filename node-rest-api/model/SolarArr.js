const mysql = require('mysql');
const Schema = mongoose.Schema;
let SolarArr = new Schema(
  {
    arrayID: {
      type: Number,
    },
    solarStatus: {
      type: String,
    },
    arrayVoltage: {
      type: Number,
    },
    arrayCurrent: {
      type: Number,
    },
    arrayTemp: {
      type: Number,
    },
    trackerTilt: {
      type: Number,
    },
    trackerAzimuth: {
      type: Number,
    },
  },
  {
    table: 'solar_arrays',
  }
);
module.exports = mysql.model('SolarArr', SolarArr);
