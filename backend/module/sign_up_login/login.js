const express = require("express");
const router = express.Router();
const mariadb = require("../../mariadb_pool");
const User = require("../Models/User");
const userController = require("../Controllers/user.controller");

router.post("/user_db", async (req, res) => {
    const { user_id, user_password } = req.body;
    let mariadb_connect;

    try {
        mariadb_connect = await mariadb.getConnection();
        const userCheckQuery = "select * from user_db where user_id = ? AND user_password = ?";
        const rows = await mariadb_connect.query(userCheckQuery, [user_id, user_password]);

        if (rows.length > 0) {
            const userInfo = rows[0];
            
            // MongoDB에 사용자 정보 저장/업데이트
            const mongoUser = await userController.saveUser(
                userInfo.user_nickname,
                userInfo.user_id,
                userInfo.user_password
            );

            // 세션에 사용자 정보 저장
            req.session.user = {
                user_id: userInfo.user_id,
                name: userInfo.user_nickname,
                mongoId: mongoUser._id
            };

            return res.json({
                success: true,
                user: {
                    user_id: userInfo.user_id,
                    name: userInfo.user_nickname,
                    mongoId: mongoUser._id,
                    token: req.sessionID
                }
            });
        } else {
            return res.json({ 
                success: false, 
                message: '아이디 또는 비밀번호가 일치하지 않습니다.' 
            });
        }
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: '서버 오류가 발생했습니다.'
        });
    } finally {
        if (mariadb_connect) mariadb_connect.release();
    }
});

module.exports = router;