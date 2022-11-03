// const express = require('express');
// const app = express();
// const mysql = require('mysql');

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'blue108',
//   password: 'System-Unwary-Random-Canister9',
//   database: 'solar',
// });

// connection.connect((err) => {
//   if (err) throw err;
//   console.log('Connected to MySQL Server!');
// });

// app.get('/app/solar-arr', (req, res) => {
//   connection.query('SELECT * from solar_arrays', (err, rows) => {
//     if (err) throw err;
//     console.log('The data from users table are: \n', rows);
//     connection.end();
//   });
// });

// app.listen(3000, () => {
//   console.log('Server is running at port 3000');
// });

// / const express = require('express');
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
const { createPool } = require('mysql');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const pool = createPool({
  host: 'localhost',
  user: 'blue108',
  password: 'System-Unwary-Random-Canister9',
  connectionLimit: 10,
  database: 'solar',
});

// pool.query(`select * from solar.solar_arrays`, (err, res) => {
//   return console.log('-------->Res: ', res);
// });

// const connection = mysql.createConnection({
//   host: '10.0.108.79',
//   user: 'blue108',
//   password: 'System-Unwary-Random-Canister9',
//   database: 'solar',
// });

// connection.connect(function (error) {
//   if (error) {
//     console.log('------->Error: ', error);
//     throw error;
//   } else {
//     console.log('Connected to MySQL! Database name: solar');
//   }
// });

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
  console.log('------->Res: ', res);
  // pool.getConnection((err, connection) => {
  //   console.log('------->Connection: ', connection);
  //   if (err) {
  //     console.log('------->Error: ', err);
  //     throw err;
  //   }
  //   console.log('connected as id ' + connection.threadId);
  pool.query('SELECT * from solar-arrays', (err, rows) => {
    if (!err) {
      console.log('------->Result: ', res);
      res.send(rows);
    } else {
      console.log(err);
    }
    // if(err) throw err
    console.log('The data from beer table are: \n', rows);
  });
});

// app.get('/api/solar-arr', function (req, res) {
//   console.log(info() + ' clientes request.... ');
//   var sql = 'SELECT * FROM solar_arrays';
//   conexao.query(sql, function (err, result, fields) {
//     if (err) {
//       console.log(info() + '<----->' + err);
//       res.send(info() + ': DBErr.....!');
//     } else {
//       console.log(info() + '<----->' + result);
//       res.send(result);
//     }
//   });
// });

// function info() {
//   now = new Date();
//   return now.getTime();
// }

// To stop current listening at port 4200
// sudo lsof -t -i:8080
// TO kill port 4200
// sudo npx kill-port 8080
app.listen(port, function () {
  console.log('App is running at http://10.0.108.79:' + port + '/');
  console.log('--->Hit CRTL-C to stop the node server.  ');
});
