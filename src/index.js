// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const mysql = require('mysql');
// const events = require('./solar');

// const connection = mysql.createConnection({
//   host: '10.0.108.76',
//   user: 'blue108',
//   password: 'System-Unwary-Random-Canister9',
//   database: 'solar',
// });

// connection.connect();

// const port = process.env.PORT || 8000;

// const app = express()
//   .use(cors())
//   .use(bodyParser.json())
//   .use(events(connection));

// app.listen(port, () => {
//   console.log(`Express server listening on port ${port}`);
// });

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const pool = mysql.createPool({
  connectionLimit: 5,
  host: '10.0.108.76',
  port: 8080,
  user: 'blue108',
  password: 'System-Unwary-Random-Canister9',
  database: 'solar',
});

const app = express();
const port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
// // Parsing middleware
// // Parse application/x-www-form-urlencoded
// // app.use(bodyParser.urlencoded({ extended: false })); // Remove
// app.use(express.urlencoded({ extended: true })); // New
// // Parse application/json
// // app.use(bodyParser.json()); // Remove
// app.use(express.json()); // New

// MySQL Code goes here

// // Listen on enviroment port or 5000
// app.listen(port, () => console.log(`Listening on port ${port}`));

// var dport = app.get('port');

// Get all beers
app.get('/api/solar-arr', (req, res) => {
  console.log('Res: ', res);
  pool.getConnection((err, connection) => {
    if (err) {
      console.log('!Error: ', err);
      throw err;
    }
    console.log('connected as id ' + connection.threadId);
    connection.query('SELECT * from solar-arrays', (err, rows) => {
      connection.release(); // return the connection to pool

      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
      // if(err) throw err
      console.log('The data from beer table are: \n', rows);
    });
  });
});

// To stop current listening at port 4200
// sudo lsof -t -i:8080
// TO kill port 4200
// sudo npx kill-port 8080
app.listen(port, function () {
  console.log('App is running at http://10.0.108.79:' + port + '/');
  console.log('--->Hit CRTL-C to stop the node server.  ');
});

module.exports = app;
