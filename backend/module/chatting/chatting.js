const express = require('express');
const router = express.Router();
const Message = require('../Models/chat');
const Room = require('../Models/room');

// 메시지 조회
router.get("/messages/:roomId", async (req, res) => {
  try {
    const messages = await Message.find({ room: req.params.roomId })
      .populate('user.id', 'name')
      .sort({ createdAt: -1 })
      .limit(50);
    res.json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 방 정보 조회
router.get("/:roomId", async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId)
      .populate('members', 'name');
    if (!room) throw new Error("방을 찾을 수 없습니다.");
    res.json({ success: true, room });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
