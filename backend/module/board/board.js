const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const mariadb = require("../../mariadb_pool");

router.post("/board_db", async (req, res) => {
  const { title, content, user_id } = req.body;
  const logged_user = req.session.logged_user;
  
  let mariadb_connect;
  try {
    mariadb_connect = await mariadb.getConnection();
    const save_content_query =
      "insert into board_db (title, content, user_id) VALUES (?, ?, ?)";
    const values = [title, content, req.session.user_id];
    await mariadb_connect.query(save_content_query, values);
    console.log("데이터가 DB로 전송되었습니다.");
  } catch (error) {
    console.log("데이터를 저장하는 중 오류가 발생했습니다", error);
    res.status(500).send("데이터 저장 오류");
  } finally {
    if (mariadb_connect) mariadb_connect.release();
  }
});
module.exports = router;