const Room = require("../Models/room");
const User = require("../Models/User");
const mongoose = require('mongoose');
const roomController = {};

// 데이터베이스 작업만 처리하는 컨트롤러 메서드들
roomController.getRoom = async (roomId) => {
  try {
    const room = await Room.findById(roomId)
      .populate('members', 'name')
      .exec();
    if (!room) throw new Error("해당 방이 없습니다.");
    return room;
  } catch (error) {
    throw new Error(`방 정보 조회 실패: ${error.message}`);
  }
};

roomController.getAllRooms = async () => {
  try {
    return await Room.find({})
      .populate('members', 'name')
      .sort({ createdAt: -1 })
      .exec();
  } catch (error) {
    throw new Error(`방 목록 조회 실패: ${error.message}`);
  }
};

roomController.createRoom = async (name, creator) => {
  try {
    if (!name || name.trim().length === 0) {
      throw new Error("방 이름은 필수입니다.");
    }
    
    const existingRoom = await Room.findOne({ room: name });
    if (existingRoom) {
      throw new Error("이미 존재하는 방 이름입니다.");
    }

    const newRoom = new Room({
      room: name.trim(),
      members: [{
        userId: creator.userId,
        userName: creator.userName
      }],
      activeMembers: [{
        userId: creator.userId,
        userName: creator.userName
      }],
      isActive: true,
      memberCount: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastMessage: null
    });
    
    return await newRoom.save();
  } catch (error) {
    throw new Error(`방 생성 실패: ${error.message}`);
  }
};

roomController.leaveRoom = async (roomId, userId) => {
  try {
    const room = await Room.findById(roomId);
    if (!room) throw new Error("방을 찾을 수 없습니다.");
    
    if (typeof userId !== 'string') {
      throw new Error("유효하지 않은 userId 형식입니다.");
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);
    
    room.members = room.members.filter(member => {
      if (!member.userId || typeof member.userId.toString !== 'function') {
        console.error('Invalid member.userId:', member.userId);
        return true; // 잘못된 데이터는 유지
      }
      return member.userId.toString() !== userObjectId.toString();
    });

    room.activeMembers = room.activeMembers.filter(member => {
      if (!member.userId || typeof member.userId.toString !== 'function') {
        console.error('Invalid member.userId:', member.userId);
        return true; // 잘못된 데이터는 유지
      }
      return member.userId.toString() !== userObjectId.toString();
    });

    room.memberCount = room.members.length;
    
    await room.save();
    return room;
  } catch (error) {
    console.error('Leave room error details:', error);
    throw new Error(`방 나가기 실패: ${error.message}`);
  }
};

module.exports = roomController;
