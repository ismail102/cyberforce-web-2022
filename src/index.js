const express = require('express');
const app = express();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'blue108',
  password: 'System-Unwary-Random-Canister9',
  database: 'solar',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Server!');
});

app.get('/', (req, res) => {
  connection.query('SELECT * from solar_arrays LIMIT 1', (err, rows) => {
    if (err) throw err;
    console.log('The data from users table are: \n', rows);
    connection.end();
  });
});

app.listen(3000, () => {
  console.log('Server is running at port 3000');
});
