/* 로그인 페이지 */
import { Link } from "react-router-dom";
import './login.css'

export default function Login() {
  return (
    <div className="d-flex flex-column justify-content-center login_container">
    <form action="/login/user_db" method="post" className="container-fluid d-flex flex-column align-items-center">
      {/* 아이디 입력 */}
      <div className="input-group w-25 mb-3">
        <span className="input-group-text">
          아이디<sup>*</sup>
        </span>
        <input
          type="text"
          name="user_id"
          className="form-control"
          placeholder="아이디를 입력해주세요 8~15자"
          minLength={8}
          maxLength={15}
          required
        />
      </div>
      { /* 비밀번호 입력*/ }
      <div className="input-group w-25 mb-3">
        <span className="input-group-text">
          비밀번호<sup>*</sup>
        </span>
        <input
          type="password"
          name="user_password"
          className="form-control"
          placeholder="비밀번호를 입력해주세요 / 8~15자"
          minLength={8}
          maxLength={15}
          required
        />
      </div>
      { /* 아이디 기억, 찾기 */ }
      <div className="container d-flex justify-content-between w-25 mb-3">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="memorize_id"
          />
          <label className="form-check-label" for="remember_id">
            아이디 기억
          </label>
        </div>
        <nav>
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
};
