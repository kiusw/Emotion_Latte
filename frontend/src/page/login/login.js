import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import socket from '../../socket';
import './login.css'

export default function Login({ setUser }) {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      const response = await fetch('/login/user_db', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: formData.get('user_id'),
          user_password: formData.get('user_password'),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        navigate('/main');
      } else {
        alert(data.message || '로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('로그인 처리 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    return () => {
      socket.off('authenticated');
      socket.off('authError');
    };
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center login_container">
      <form
        onSubmit={handleSubmit}
        className="container-fluid d-flex flex-column align-items-center"
      >
        {/* 아이디 입력 */}
        <div className="input-group mb-3 col-12 col-md-6">
          <span className="input-group-text">
            아이디<sup>*</sup>
          </span>
          <input
            type="text"
            name="user_id"
            className="form-control custom-placeholder"
            placeholder="아이디를 입력해주세요 8~15자"
            minLength={8}
            maxLength={15}
            required
          />
        </div>
        
        {/* 비밀번호 입력 */}
        <div className="input-group mb-3 col-12 col-md-6">
          <span className="input-group-text">
            비밀번호<sup>*</sup>
          </span>
          <input
            type="password"
            name="user_password"
            className="form-control custom-placeholder"
            placeholder="비밀번호를 입력해주세요 / 8~15자"
            minLength={8}
            maxLength={15}
            required
          />
        </div>
        
        {/* 아이디 기억, 찾기 */}
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center col-12 col-md-6 mb-3">
          <div className="form-check">
            <input
              className="form-check-input custom-placeholder"
              type="checkbox"
              id="memorize_id"
              name="remember"
            />
            <label className="form-check-label" htmlFor="memorize_id">
              아이디 기억
            </label>
          </div>
          <nav className="mt-3 mt-md-0">
            <Link to="/find_account">아이디, 비밀번호 찾기</Link> ㅣ{" "}
            <Link to="/sign_up">회원가입</Link>
          </nav>
        </div>
        
        <button type="submit" className="btn btn-primary btn-lg">
          로그인
        </button>
      </form>
    </div>
  );
}