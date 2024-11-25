import React, { useRef, useEffect } from "react";
import "./MessageContainer.css";

const MessageContainer = ({ messageList, currentUser }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const formatTime = (timestamp) => {
    try {
      return new Date(timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('시간 포맷 에러:', error);
      return '';
    }
  };

  return (
    <div className="message-container">
      {messageList && messageList.map((msg, index) => {
        if (!msg) return null;
        
        const isMyMessage = msg.sender === currentUser.mongoId;
        
        return (
          <div 
            key={msg._id || index} 
            className={`message-item ${isMyMessage ? 'my-message' : 'other-message'}`}
          >
            {!isMyMessage && (
              <div className="sender-name">{msg.senderName}</div>
            )}
            <div className="message-bubble">
              <div className="message-content">
                {msg.content || msg.message}
              </div>
              <div className="message-time">
                {formatTime(msg.timestamp)}
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageContainer;
