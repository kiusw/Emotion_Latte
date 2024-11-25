const express = require('express');
const router = express.Router();
const roomController = require("../Controllers/room.controller");
const Room = require('../Models/room');
const mongoose = require("mongoose");
const Message = require('../Models/chat');

// 채팅방 목록 조회
router.get('/', async (req, res) => {
  try {
    const rooms = await roomController.getAllRooms();
    res.json({ success: true, rooms });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 새로운 채팅방 생성
router.post('/', async (req, res) => {
  try {
    const { name, creator } = req.body;
    const newRoom = await roomController.createRoom(name, creator);
    const io = req.app.get('io');
    io.emit('rooms', await roomController.getAllRooms());
    res.json({ success: true, room: newRoom });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 채팅방 입장
router.post('/:roomId/join', async (req, res) => {
  try {
    const { roomId } = req.params;
    const { userId, userName } = req.body;

    console.log('받은 데이터:', { roomId, userId, userName });

    // 입력값 검증
    if (!roomId || !userId || !userName) {
      return res.status(400).json({ 
        success: false, 
        message: '필수 정보가 누락되었습니다.' 
      });
    }

    // 방 존재 여부 확인
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ 
        success: false, 
        message: '존재하지 않는 방입니다.' 
      });
    }

    // 이미 참여 중인지 확인
    const isAlreadyJoined = room.members.some(member => 
      member.userId.toString() === userId
    );
    
    if (isAlreadyJoined) {
      return res.status(200).json({ 
        success: true, 
        message: '이미 참여 중인 방입니다.' 
      });
    }

    // members와 activeMembers 배열에 새로운 멤버 추가
    const newMember = {
      userId: new mongoose.Types.ObjectId(userId),
      userName: userName
    };
    
    room.members.push(newMember);
    room.activeMembers.push(newMember);
    room.updatedAt = new Date();
    
    await room.save();

    res.json({ 
      success: true, 
      message: '방 입장 성공' 
    });

  } catch (error) {
    console.error('방 입장 처리 중 오류:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// 채팅방의 메시지 조회 라우트
router.get('/:roomId/messages', async (req, res) => {
  try {
    const { roomId } = req.params;
    
    const messages = await Message.find({ room: roomId })
      .sort({ timestamp: 1 })
      .select('_id sender senderName content timestamp isSystemMessage')
      .lean();

    res.json({
      success: true,
      messages: messages
    });
  } catch (error) {
    console.error('메시지 조회 실패:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 채팅방 정보 조회
router.get('/:roomId', async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findById(roomId);
    
    if (!room) {
      return res.status(404).json({
        success: false,
        error: '방을 찾을 수 없습니다.'
      });
    }

    res.json({
      success: true,
      room: room
    });
  } catch (error) {
    console.error('방 정보 조회 실패:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 채팅방 나가기
router.post('/:roomId/leave', async (req, res) => {
  try {
    const { roomId } = req.params;
    const { userId, userName } = req.body;
    
    console.log('Leave request received:', {
      roomId,
      userId,
      userName,
      body: req.body
    });

    // 입력값 검증
    if (!roomId || !userId || !userName) {
      console.log('Missing required fields:', {
        hasRoomId: !!roomId,
        hasUserId: !!userId,
        hasUserName: !!userName
      });
      
      return res.status(400).json({
        success: false,
        message: '필수 정보가 누락되었습니다.',
        missing: {
          roomId: !roomId,
          userId: !userId,
          userName: !userName
        }
      });
    }

    // roomController를 통해 방 나가기 처리
    const updatedRoom = await roomController.leaveRoom(roomId, userId);

    // 시스템 메시지 생성
    const leaveMessage = new Message({
      room: roomId,
      sender: new mongoose.Types.ObjectId('000000000000000000000000'),
      senderName: 'System',
      content: `${userName}님이 퇴장하셨습니다.`,
      timestamp: new Date(),
      isSystemMessage: true
    });
    
    await leaveMessage.save();

    // Socket.io를 통해 퇴장 메시지 전송
    const io = req.app.get('io');
    io.to(roomId).emit('message', {
      _id: leaveMessage._id,
      sender: 'system',
      senderName: 'System',
      content: leaveMessage.content,
      timestamp: leaveMessage.timestamp,
      isSystemMessage: true
    });

    res.json({
      success: true,
      message: '방 나가기 성공'
    });

  } catch (error) {
    console.error('방 나가기 처리 중 오류:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
