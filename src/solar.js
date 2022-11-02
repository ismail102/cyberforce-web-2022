// const express = require('express');

// function createRouter(db) {
//   const router = express.Router();
//   const owner = '';

//   router.get('/api/solar', function (req, res, next) {
//     // db.query(
//     //   'SELECT solarStatus, arrayVoltage FROM solar_arrays',
//     //   //   [owner, 10*(req.params.page || 0)],
//     //   (error, results) => {
//     //     if (error) {
//     //       console.log(error);
//     //       res.status(500).json({ status: 'error' });
//     //     } else {
//     //       res.status(200).json([
//     //         { name: 'ismail', isAvailable: true },
//     //         { name: 'sai', isAvailable: true },
//     //       ]);
//     //     }
//     //   }
//     // );
//     res.status(200).json([
//       { name: 'ismail', isAvailable: true },
//       { name: 'sai', isAvailable: true },
//     ]);
//   });

//   return router;
// }

// module.exports = createRouter;
