const express = require("express");
const router = express.Router();
const mariadb = require("../../mariadb_pool");
const User = require("../Models/User");

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
    // MariaDB에 사용자 정보 저장
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
    console.log("데이터가 MariaDB로 전송되었습니다.");

    // MongoDB에 채팅 관련 정보만 저장
    const newMongoUser = new User({
      name: user_nickname,
      mariadb_id: user_id,
      password: user_password,
      online: false,
      room: null
    });
    await newMongoUser.save();
    console.log("MongoDB에 채팅 관련 정보 저장 완료");

    return res.redirect(303, '/');
  } catch (error) {
    console.log("데이터를 저장하는 중 오류가 발생했습니다", error);
    res.status(500).send("데이터 저장 오류");
  } finally {
    if (mariadb_connect) mariadb_connect.release();
  }
});

router.post("/user_db/check_duplicate_id", async (req, res) => {
  const { user_id } = req.body;

  let mariadb_connect;
  try {
    // MariaDB 연결
    mariadb_connect = await mariadb.getConnection();

    // 아이디 중복 확인 쿼리
    const userCheckQuery = "SELECT * FROM user_db WHERE user_id = ?";
    const row = await mariadb_connect.query(userCheckQuery, [user_id]);

    if (row.length > 0) {
      // 아이디가 이미 존재하는 경우
      return res.status(200).send({ available: false });
    } else {
      // 사용 가능한 아이디인 경우
      return res.status(200).send({ available: true });
    }
  } catch (error) {
    console.error("아이디 중복 확인 중 오류 발생:", error);
    res.status(500).send("서버 오류");
  } finally {
    // 연결 해제
    if (mariadb_connect) mariadb_connect.release();
  }
});

module.exports = router;