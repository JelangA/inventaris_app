// const jwt = require("jsonwebtoken");
// const respon = require("../utils/helpers");
//
// exports.verifyToken = (req, res, next) => {
//   // Ambil token dari header Authorization
//   const token = req.headers.authorization?.split(" ")[1];
//
//   if (!token) {
//     // Jika tidak ada token, kirim respons error
//     return respon.responseErr(res, 401, "No token provided", "")
//   }
//
//   // Verifikasi token menggunakan JWT
//   jwt.verify(token, "secret-key", (err, decoded) => {
//     if (err) {
//       // Jika token tidak valid, kirim respons error
//       return respon.responseErr(res, 401, "Invalid token", "")
//     }
//
//     // Jika token valid, simpan data pengguna ke dalam request
//     req.user = decoded;
//     next();
//   });
// };
