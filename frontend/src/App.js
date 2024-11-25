import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import socket from "./socket.js";
import Home from "./page/home/home.js";
import Login from "./page/login/login.js";
import Sign_up from "./page/sign_up/sign_up.js";
import Board from "./page/board/board.js";
import Main_screen from "./page/main_screen/main_screen.js";
import Friend from "./page/friend/friend.js";
import RoomListPage from "./page/RoomListPage/RoomListPage.js";
import ChatPage from "./page/Chatpage/Chatpage.js";
//import Playlist from "./component/Playlist/Playlist.jsx";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [messageList, setMessageList] = useState([]);
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (!socket.connected) {
        socket.connect();
        
        socket.auth = { 
          userId: user.user_id,
          mongoId: user.mongoId 
        };

        socket.emit('authenticate', {
          user_id: user.user_id,
          mongoId: user.mongoId
        });
      }

      const handleAuthenticated = () => {
        console.log("인증 성공");
        fetchRooms();
        navigate('/main');
      };

      socket.on("authenticated", handleAuthenticated);

      return () => {
        socket.off("authenticated", handleAuthenticated);
      };
    }
  }, [user, navigate]);

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

  const createRoom = async (roomName) => {
    try {
      const response = await fetch('/chatting_Room/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: roomName,
          creator: user?._id 
        }),
      });
      const data = await response.json();
      if (data.success) {
        socket.emit("rooms");
      }
    } catch (error) {
      console.error('방 생성 실패:', error);
    }
  };

  return (
    <Routes>
      <Route path="friend" element={<Friend />} />
      <Route path="/main" element={<Main_screen />} />
      <Route path="/board" element={<Board />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/sign_up" element={<Sign_up />} />
      <Route 
        path="/chatting_Room" 
        element={
          user ? (
            <RoomListPage 
              rooms={rooms} 
              createRoom={createRoom}
              user={user}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />
      <Route 
        path="/chatting_Room/:id" 
        element={
          user ? (
            <ChatPage 
              user={user} 
              messageList={messageList}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />
    </Routes>
  );
}

export default App;