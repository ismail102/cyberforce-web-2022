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
const port = process.env.PORT || 5000;

// Parsing middleware
// Parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false })); // Remove
app.use(express.urlencoded({ extended: true })); // New
// Parse application/json
// app.use(bodyParser.json()); // Remove
app.use(express.json()); // New

// MySQL Code goes here

// Listen on enviroment port or 5000
app.listen(port, () => console.log(`Listening on port ${port}`));

const pool = mysql.createPool({
  connectionLimit: 10,
  host: '10.0.108.76',
  user: 'blue108',
  password: 'System-Unwary-Random-Canister9',
  database: 'solar',
});

// Get all beers
app.get('/api/solar-arr', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
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
