const express = require('express');
const path = require('path');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
mysql
  .connect('mysql://10.0.108.76:3306/solar')
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err.reason);
  });
const solarRoute = require('./routes/solar.routes');
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());
// Static directory path
app.use(express.static(path.join(__dirname, 'dist')));
// API root
app.use('/api', solarRoute);
// PORT
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Listening on port ' + port);
});
// 404 Handler
app.use((req, res, next) => {
  next(createError(404));
});
// Base Route
app.get('/', (req, res) => {
  res.send('invaild endpoint');
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});
// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
