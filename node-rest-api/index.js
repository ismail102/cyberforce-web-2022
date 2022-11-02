const express = require('express');
const path = require('path');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

// const connection = mysql.createConnection({
//   host: '10.0.108.76',
//   user: 'blue108',
//   password: 'System-Unwary-Random-Canister9',
//   database: 'solar',
// });

// connection.connect(function (error) {
//   if (error) {
//     throw error;
//   } else {
//     console.log('Connected to MySQL! Database name: solar');
//   }
// });

// module.exports = connection;
// // mysql
// //   .connect('mysql://10.0.108.76:3306/solar')
// //   .then((x) => {
// //     console.log(
// //       `Connected to Mongo! Database name: "${x.connections[0].name}"`
// //     );
// //   })
// //   .catch((err) => {
// //     console.error('Error connecting to mongo', err.reason);
// //   });

// const solarRoute = require('./routes/solar.routes');
// const app = express();
// app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: false,
//   })
// );
// app.use(cors());
// // Static directory path
// app.use(express.static(path.join(__dirname, 'dist')));
// // API root
// app.use('/api', solarRoute);
// // PORT
// const port = process.env.PORT || 8080;
// app.listen(port, () => {
//   console.log('Listening on port ' + port);
// });
// // 404 Handler
// app.use((req, res, next) => {
//   next(createError(404));
// });
// // Base Route
// app.get('/', (req, res) => {
//   res.send('invaild endpoint');
// });
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/index.html'));
// });
// // error handler
// app.use(function (err, req, res, next) {
//   console.error(err.message);
//   if (!err.statusCode) err.statusCode = 500;
//   res.status(err.statusCode).send(err.message);
// });

console.log('Start...');

var now = new Date();
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/app'));

const conexao = mysql.createConnection({
  host: '10.0.108.76',
  user: 'blue108',
  password: 'System-Unwary-Random-Canister9',
  database: 'solar',
});

conexao.connect(function (err) {
  if (err) {
    console.log(info() + ' ' + err);
  } else {
    console.log(info() + ' connected...');
  }
});

function info() {
  now = new Date();
  return now.getTime();
}

app.set('port', process.env.PORT || 4200);

// app.get('/', function(req, res){
//     console.log(info()+" page request.... ");
//     res.sendFile(__dirname +'/'+'app/view/index.html');
// });

app.get('/solar-arr', function (req, res) {
  console.log(info() + ' clientes request.... ');
  var sql = 'SELECT * FROM solar_arrays';
  conexao.query(sql, function (err, result, fields) {
    if (err) {
      console.log(info() + ' ' + err);
      res.send(info() + ': dbErr...');
    } else {
      console.log(info() + ' ' + result);
      res.send(result);
    }
  });
});

// app.post('/clientPost', function(req, res){
//     var data = req.body;
//     var dnome = data.nome;
//     var dmorada = data.morada;
//     var sql = "INSERT INTO CLIENTES2 (nome,morada) VALUES(?, ?)";
//     conexao.query(sql, [dnome, dmorada], function(err, result){
//         if(err){
//             console.log(info()+":02 "+err);
//             res.send(info()+": dbErr02...");
//         }
//         else
//         {
//             console.log(info()+" "+ result);
//             res.send(result);
//         }
//     });
// });

var dport = app.get('port');
app.listen(dport, function () {
  console.log(
    info() + ' ' + ' app is running at http://10.0.108.79:' + dport + '/'
  );
  console.log('   Hit CRTL-C to stop the node server.  ');
});
