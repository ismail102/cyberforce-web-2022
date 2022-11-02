const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const events = require('./solar');

const connection = mysql.createConnection({
  host: '10.0.108.76',
  user: 'blue108',
  password: 'System-Unwary-Random-Canister9',
  database: 'solar',
});

connection.connect();

const port = process.env.PORT || 8000;

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(events(connection));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
