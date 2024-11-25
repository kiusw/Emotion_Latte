import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import socket from "../../socket";
import MessageContainer from "../../component/MessageContainer/MessageContainer";
import InputField from "../../component/InputField/InputField";
import ToolBar from "../../component/footer_toolBar/toolBar";
import "./chatPageStyle.css";

const ChatPage = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // 방 정보 로드
    const loadRoomInfo = async () => {
      try {
        const response = await fetch(`/chatting_Room/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        if (data.success) {
          setRoomName(data.room.room);
        }
      } catch (error) {
        console.error("방 정보 로드 실패:", error);
      }
    };

    loadRoomInfo();
  }, [id]);

  useEffect(() => {
    socket.on("previousMessages", (messages) => {
      const formattedMessages = messages.map(msg => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
      setMessageList(formattedMessages);
    });

    socket.emit("joinRoom", {
      roomId: id,
      userId: user.mongoId,
      userName: user.name
    });

    socket.on("message", (newMessage) => {
      setMessageList(prev => [...prev, {
        ...newMessage,
        timestamp: new Date(newMessage.timestamp)
      }]);
    });

    return () => {
      socket.emit("leaveRoom", { roomId: id });
      socket.off("previousMessages");
      socket.off("message");
    };
  }, [id, user]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const messageData = {
        message: message.trim(),
        roomId: id,
        userId: user.mongoId,
        userName: user.name
      };

      socket.emit("sendMessage", messageData);
      setMessage("");
    }
  };

  const handleBackButton = async () => {
    try {
      console.log('Leave request payload:', {
        userId: user.mongoId,
        userName: user.name
      });

      const response = await fetch(`/chatting_Room/${id}/leave`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: user.mongoId,
          userName: user.name
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Leave room error:', errorData);
        throw new Error(errorData.message || '방 나가기 실패');
      }

      const data = await response.json();
      if (data.success) {
        // Socket 이벤트 발생
        socket.emit("leaveRoom", { roomId: id });
        // 방 목록 페이지로 이동
        navigate("/chatting_Room");
      }
    } catch (error) {
      console.error("방 나가기 실패 상세:", error);
      navigate("/chatting_Room");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-content">
        <nav className="chat-nav">
          <button onClick={handleBackButton} className="back-button">
            ←
          </button>
          <div className="room-info">
            <div className="room-name">{roomName || "채팅방"}</div>
          </div>
        </nav>
        
        <MessageContainer 
          messageList={messageList} 
          currentUser={user}
          showSenderName={true}
        />
        
        <div className="input-field-container">
          <InputField
            message={message}
            setMessage={setMessage}
            sendMessage={handleSendMessage}
          />
        </div>
      </div>
      <div className="toolbar-container">
        <ToolBar />
      </div>
    </div>
  );
};

export default ChatPage;
