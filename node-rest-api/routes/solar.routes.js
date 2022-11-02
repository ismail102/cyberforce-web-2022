const express = require('express');
const app = express();
const solarArrRoute = express.Router();
let solarArr = require('../model/SolarArr');

// Get all Book
solarArrRoute.route('/solar-arr').get((req, res) => {
  solarArr.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});
// Get Book
solarArrRoute.route('/solar-arr/:id').get((req, res) => {
  solarArr.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});
module.exports = solarArrRoute;
