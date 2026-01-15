import mysql, { PoolConnection } from "mysql2";


// DB 연결 설정
const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "1234",
  database: "mm.orders",
  port: 3306,
});

// 연결 테스트
pool.getConnection((err: NodeJS.ErrnoException | null, connection: PoolConnection) => {
  if (err) {
    console.error("DB 연결 실패 ❌", err);
    return;
  }
  console.log("MariaDB 연결 성공 🎉");
  connection.release();
});
// 근데 any 써도될꺼같은데 저렇게 어렵게해야할까..? 🤔

export default pool.promise();