const User = require("../module/Models/User");
const Room = require("../module/Models/room");
const Message = require("../module/Models/chat");

module.exports = (io) => {
  io.on("connection", async (socket) => {
    socket.on("authenticate", async (userData) => {
      try {
        const user = await User.findOneAndUpdate(
          { 
            $or: [
              { mariadb_id: userData.user_id },
              { _id: userData.mongoId }
            ]
          },
          { 
            $set: { 
              socketId: socket.id,
              online: true,
              lastConnected: new Date()
            }
          },
          { new: true }
        ).populate('room');

        if (!user) {
          throw new Error("사용자를 찾을 수 없습니다");
        }

        socket.user = user;
        
        const existingSocket = await io.sockets.sockets.get(user.socketId);
        if (existingSocket && existingSocket.id !== socket.id) {
          existingSocket.disconnect(true);
        }

        socket.emit("authenticated");
        
        const rooms = await Room.find().populate('members', 'name');
        socket.emit("rooms", rooms);
      } catch (error) {
        socket.emit("authError", { message: error.message });
      }
    });

    socket.on("joinRoom", async ({ roomId, userId, userName }) => {
      try {
        if (socket.currentRoom) {
          socket.leave(socket.currentRoom);
        }
        
        socket.join(roomId);
        socket.currentRoom = roomId;
        
        const messages = await Message.find({ room: roomId })
          .sort({ timestamp: 1 })
          .select('_id sender senderName content timestamp')
          .lean();
        
        const formattedMessages = messages.map(msg => ({
          _id: msg._id,
          sender: msg.sender,
          senderName: msg.senderName,
          content: msg.content,
          timestamp: msg.timestamp
        }));
        
        const joinMessage = new Message({
          room: roomId,
          sender: 'system',
          senderName: 'System',
          content: `${userName}님이 입장하셨습니다.`,
          timestamp: new Date(),
          isSystemMessage: true
        });
        
        await joinMessage.save();
        
        socket.emit("previousMessages", [...formattedMessages, {
          _id: joinMessage._id,
          sender: 'system',
          senderName: 'System',
          content: joinMessage.content,
          timestamp: joinMessage.timestamp,
          isSystemMessage: true
        }]);
        
        socket.to(roomId).emit("message", {
          _id: joinMessage._id,
          sender: 'system',
          senderName: 'System',
          content: joinMessage.content,
          timestamp: joinMessage.timestamp,
          isSystemMessage: true
        });
        
      } catch (error) {
        socket.emit("joinError", { error: error.message });
      }
    });

    socket.on("sendMessage", async (messageData) => {
      try {
        const { message, roomId, userId, userName } = messageData;
        
        const newMessage = new Message({
          room: roomId,
          sender: userId,
          senderName: userName,
          content: message,
          timestamp: new Date(),
          isSystemMessage: false
        });

        await newMessage.save();
        
        const messageToSend = {
          _id: newMessage._id,
          sender: userId,
          senderName: userName,
          content: message,
          timestamp: newMessage.timestamp,
          isSystemMessage: false
        };

        io.to(roomId).emit("message", messageToSend);

      } catch (error) {
        socket.emit("messageError", { error: error.message });
      }
    });

    socket.on("leaveRoom", async ({ roomId }) => {
      if (socket.currentRoom) {
        socket.leave(socket.currentRoom);
        socket.currentRoom = null;
      }
    });

    socket.on("disconnect", () => {
      // 참조: chatting.js
      startLine: 131
      endLine: 137
    });
  });
};
