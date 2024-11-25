import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../socket";
import ToolBar from "../../component/footer_toolBar/toolBar";
import "./RoomListPageStyle.css";

const RoomListPage = ({ user }) => {
  const navigate = useNavigate();
  const [newRoomName, setNewRoomName] = useState("");
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // 초기 방 목록 로딩
    const fetchRooms = async () => {
      try {
        const response = await fetch('/chatting_Room');
        const data = await response.json();
        if (data.success) {
          setRooms(data.rooms);
        }
      } catch (error) {
        console.error('방 목록 조회 실패:', error);
      }
    };

    fetchRooms();

    // 실시간 방 목록 업데이트
    socket.on("rooms", (updatedRooms) => {
      setRooms(updatedRooms);
    });

    return () => {
      socket.off("rooms");
    };
  }, [navigate]);

  const handleCreateRoom = async () => {
    if (!user) {
      console.error('사용자 정보가 없습니다');
      return;
    }

    if (newRoomName.trim()) {
      try {
        const response = await fetch('/chatting_Room', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            name: newRoomName,
            creator: {
              userId: user.mongoId,
              userName: user.name
            }
          }),
        });
        
        const data = await response.json();
        if (data.success) {
          setNewRoomName("");
          socket.emit("rooms");
        }
      } catch (error) {
        console.error('방 생성 실패:', error);
      }
    }
  };

  const handleJoinRoom = async (roomId) => {
    if (!user || !user.mongoId) {
      console.error('사용자 정보가 없습니다');
      return;
    }

    try {
      const requestData = {
        userId: user.mongoId,
        userName: user.name
      };
      
      console.log('방 입장 시도:', {
        roomId,
        userId: user.mongoId,
        userName: user.name
      });

      const response = await fetch(`/chatting_Room/${roomId}/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData)
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error('서버 응답 에러:', data);
        return;
      }

      if (data.success) {
        socket.emit("joinRoom", { 
          roomId: roomId,
          userId: user.mongoId,
          userName: user.name
        });
        navigate(`/chatting_Room/${roomId}`);
      } else {
        console.error('방 입장 실패:', data.message);
      }
    } catch (error) {
      console.error("방 입장 처리 중 오류:", error);
    }
  };

  return (
    <div className="room-container">
      <div className="room-body">
        <div className="room-nav">채팅 ▼</div>
        {rooms.map((room) => (
          <div
            key={room._id}
            className="room-list"
            onClick={() => handleJoinRoom(room._id)}
          >
            <div className="room-title">
              <div className="room-name">{room.room}</div>
              <div className="room-last-message">
                {room.lastMessage || '아직 메시지가 없습니다'}
              </div>
            </div>
            <div className="room-info">
              <div className="member-number">{room.members.length}명</div>
            </div>
          </div>
        ))}
        <button 
          className="create-room-btn" 
          onClick={() => {
            const name = prompt("방 이름을 입력하세요");
            if (name) {
              setNewRoomName(name);
              handleCreateRoom();
            }
          }}
        >
          +
        </button>
      </div>
      <div className="toolbar-container">
        <ToolBar />
      </div>
    </div>
  );
};

export default RoomListPage;
