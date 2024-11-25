const Message = require("../Models/chat")
const chatController = {}

chatController.getMessages = async (roomId) => {
  try {
    const messages = await Message.find({ room: roomId })
      .sort({ timestamp: 1 })
      .select('_id sender senderName content timestamp isSystemMessage')
      .lean();
    
    return messages.map(msg => ({
      _id: msg._id,
      sender: msg.sender,
      senderName: msg.senderName,
      content: msg.content,
      timestamp: msg.timestamp,
      isSystemMessage: msg.isSystemMessage
    }));
  } catch (error) {
    console.error("메시지 조회 실패:", error);
    throw error;
  }
};

chatController.saveChat = async (message, user, roomId) => {
  try {
    if (!roomId) {
      throw new Error("방 정보가 없습니다");
    }

    const newMessage = new Message({
      room: roomId,
      sender: user._id,
      senderName: user.name,
      content: message,
      timestamp: new Date(),
      isSystemMessage: false
    });

    const savedMessage = await newMessage.save();
    
    return {
      _id: savedMessage._id,
      sender: savedMessage.sender,
      senderName: savedMessage.senderName,
      content: savedMessage.content,
      timestamp: savedMessage.timestamp,
      isSystemMessage: savedMessage.isSystemMessage
    };
  } catch (error) {
    console.error("메시지 저장 실패:", error);
    throw error;
  }
};

module.exports = chatController;