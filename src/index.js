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
const mysql1 = require('mysql');
const mysql2 = require('mysql');

const pool1 = mysql1.createPool({
  host: '10.0.108.76',
  user: 'blue108',
  password: '',
  connectionLimit: 10,
  database: 'solar',
});

const pool2 = mysql1.createPool({
  host: 'localhost',
  user: 'blue108',
  password: 'System-Unwary-Random-Canister9',
  connectionLimit: 10,
  database: 'solar',
});

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

// Get all beers
app.get('/api/solar-arr', (req, res) => {
  console.log('----->Res: ', res);
  pool1.query('SELECT * from solar_arrays', (err, rows) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log('----->!Error: ', err);
    }
    // if(err) throw err
    console.log('----->Data fetch successfully from - 76.\n');
  });
});

// Get all beers
app.post('/api/contact-info', (req, res) => {
  console.log('----->Request: ', req.body);
  let query =
    'INSERT INTO contact_info (name, email, phone, filePath) VALUES ?';
  let values = [[Object.values(req.body)]];
  console.log('----->Values: ', values);
  pool2.query(query, [values], (err, rows) => {
    if (!err) {
      console.log('----->Rows: ', rows);
      console.log('----->Data fetch successfully from - 79.\n');
      res.send('Contact info submitted successfully.');
    } else {
      console.log('----->!Error: ', err);
    }
  });
});

app.listen(port, function () {
  console.log('App is running at http://10.0.108.79:' + port + '/');
  console.log('--->Hit CRTL-C to stop the node server.  ');
});
