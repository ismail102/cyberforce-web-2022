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
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 8080;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
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

const pool = mysql.createPool({
  connectionLimit: 10,
  host: '10.0.108.76',
  user: 'blue108',
  password: 'System-Unwary-Random-Canister9',
  database: 'solar',
});

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
// sudo lsof -t -i:4200
// TO kill port 4200
// sudo npx kill-port 4200
app.listen(port, function () {
  console.log('App is running at http://localhost:' + port + '/');
  console.log('--->Hit CRTL-C to stop the node server.  ');
});
