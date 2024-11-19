const express = require("express");
const session = require("express-session");
const mariadb = require("../../mariadb_pool");
const router = express.Router();

router.post("/user_db", async (req, res) => {
  console.log("로그인 요청 도달");
  console.log(req.body);
  const { user_id, user_password } = req.body;
  let mariadb_connect;
  try {
    mariadb_connect = await mariadb.getConnection();
    const userCheckQuery = "select * from user_db where user_id = ?";
    const row = await mariadb_connect.query(userCheckQuery, [user_id]);

    if (row.length > 0) {
      const db_user_id = row[0].user_id;
      const db_user_password = row[0].user_password;
      const db_user_nickname = row[0].user_nickname;

      if (db_user_id === user_id && db_user_password === user_password) {
        req.session.logged_user = { user_id };
        return res.redirect(303, '/main');
      } else {
        return res.send("아이디와 비밀번호가 다릅니다.");
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (mariadb_connect) mariadb_connect.release();
  }
});

module.exports = router;
