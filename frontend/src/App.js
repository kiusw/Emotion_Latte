import { BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import Header from './page/header/header';
import Home from './page/home/home';
import Login from './page/login/login';
import Sign_up from './page/sign_up/sign_up';
import Board from './page/board/board';
import Main_screen from './page/main_screen/main_screen';
import Friend from './page/friend/friend';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <MainContent />
    </BrowserRouter>
  );
}

function MainContent() {
  const location = useLocation();
  
  return (
    <div className="App">
      {location.pathname !== '/board' && location.pathname !== '/friend' && location.pathname !== '/main' && <Header />}
      <Routes>
        <Route path="friend" element={<Friend />} />
        <Route path="/main" element={<Main_screen />} />
        <Route path="/board" element={<Board />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign_up" element={<Sign_up />} />
      </Routes>
    </div>
  );
}

export default App;
