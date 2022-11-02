const express = require('express');
const app = express();
const solarArrRoute = express.Router();
let solarArr = require('../model/SolarArr');

// Get all Book
solarArrRoute.route('/solar-arr').get((req, res) => {
  console.log('Res: ', res);
  solarArr.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.set('Access-Control-Allow-Origin', 'http://10.0.108.79:4200');
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
      res.set('Access-Control-Allow-Origin', 'http://10.0.108.79:4200');
      res.json(data);
    }
  });
});
module.exports = solarArrRoute;
