const express = require("express");
const router = express.Router();
const mariadb = require("../../mariadb_pool");

router.post("/user_db", async (req, res) => {
  const {
    user_id,
    user_password,
    user_first_name,
    user_last_name,
    user_birthday,
    user_email,
    user_email_domain,
    user_nickname
  } = req.body;

  let mariadb_connect;
  try {
    mariadb_connect = await mariadb.getConnection();
    const save_account_query =
      "insert into user_db (user_id, user_password, user_first_name, user_last_name, user_birthday, user_email, user_email_domain, user_nickname) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      user_id,
      user_password,
      user_first_name,
      user_last_name,
      user_birthday,
      user_email,
      user_email_domain,
      user_nickname
    ];
    await mariadb_connect.query(save_account_query, values);
    console.log("데이터가 DB로 전송되었습니다.");
    return res.redirect(303, '/');
  } catch (error) {
    console.log("데이터를 저장하는 중 오류가 발생했습니다", error);
    res.status(500).send("데이터 저장 오류");
  } finally {
    if (mariadb_connect) mariadb_connect.release();
  }
});

module.exports = router;
