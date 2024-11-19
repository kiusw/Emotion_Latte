const express = require('express');
const router = express.Router();
const mariadb = require('../../mariadb_pool');

router.get("/user_post", async (req, res) => {
  const logged_user = req.session.logged_user;


  if (!logged_user) {
    return res.status(401).send("로그인이 필요합니다.");
  }

  let mariadb_connect;
  try {
    mariadb_connect = await mariadb.getConnection();
    const send_board_db_query = "SELECT * FROM board_db WHERE user_id = ?";
    const post = await mariadb_connect.query(send_board_db_query, [logged_user.user_id]);
    return res.json(post);
  } catch (error) {
    console.error("게시글을 불러오는 중 오류가 발생했습니다:", error);
    return res.status(500).send("게시글 불러오기 오류");
  } finally {
    if (mariadb_connect) mariadb_connect.release();
  }
});

module.exports = router;
