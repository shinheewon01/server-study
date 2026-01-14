const mysql = require("mysql2");

// DB 연결 설정
const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "1234",
  database: "mm.orders",
  port: 3306,
});

// 연결 테스트
pool.getConnection((err, connection) => {
  if (err) {
    console.error("DB 연결 실패 ❌", err);
    return;
  }
  console.log("MariaDB 연결 성공 🎉");
  connection.release();
});

module.exports = pool.promise();
