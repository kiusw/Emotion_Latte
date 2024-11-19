/* 회원가입 페이지 */
import "./sign_up.css";

export default function Sign_up() {
  const checking_password = () => {
    const password = document.querySelector(".password");
    const recheck_password = document.querySelector(".recheck_password");
    if (password && recheck_password && password.value !== recheck_password.value) {
      alert("패스워드 재확인이 일치하지 않습니다.");
    }
  };

  return (
    <form
      className="container-fluid d-flex flex-column align-items-center"
      action="/sign_up/user_db"
      method="POST"
    >
      <h1>회원가입</h1>
      <p>
        <sup>*</sup>은 필수 작성 목록입니다.
      </p>
      {/* 아이디 입력 */}
      <div className="input-group w-25 mb-3">
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
        <button type="button" className="btn btn-outline-primary" tabIndex={-1}>
          중복확인
        </button>
      </div>
      {/* 비밀번호 입력 */}
      <div className="input-group w-25 mb-3">
        <span className="input-group-text">
          비밀번호<sup>*</sup>
        </span>
        <input
          type="password"
          name="user_password"
          className="form-control custom-placeholder password"
          placeholder="비밀번호를 입력해주세요 / 8~15자"
          minLength={8}
          maxLength={15}
          required
        />
      </div>
      {/* 비밀번호 재확인 입력 */}
      <div className="input-group w-25 mb-3">
        <span className="input-group-text">
          비밀번호 재확인<sup>*</sup>
        </span>
        <input
          type="password"
          className="form-control custom-placeholder recheck_password"
          placeholder="비밀번호를 다시 입력해주세요 / 8~15자"
          minLength={8}
          maxLength={15}
          onBlur={checking_password} // 비밀번호 재확인 필드에 onBlur 이벤트 추가
          required
        />
      </div>
      {/* 성별 라디오버튼 */}
      <div className="gender-radio-btn-box">
        <div className="form-check">
          <h2>성별</h2>
          <input
            type="radio"
            className="form-check-input"
            name="gender"
            required
          />
          <label className="form-check-label">남성</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="gender" />
          <label className="form-check-label">여성</label>
        </div>
      </div>
      {/* 이름 입력 */}
      <div className="input-group w-25">
        <span className="input-group-text">
          성<sup>*</sup>
        </span>
        <input
          type="text"
          name="user_first_name"
          className="form-control custom-placeholder"
          required
        />
        <span className="input-group-text">
          이름<sup>*</sup>
        </span>
        <input
          type="text"
          name="user_last_name"
          className="form-control custom-placeholder"
          required
        />
      </div>
      {/* 생년월일 입력 */}
      <div className="input-group w-25 mb-3">
        <span className="input-group-text">
          생년월일<sup>*</sup>
        </span>
        <input
          type="date"
          name="user_birthday"
          className="form-control"
          min="1900-01-01"
          required
        />
      </div>
      {/* 닉네임 입력 */}
      <div className="input-group w-25 mb-3">
        <span className="input-group-text">
          별명<sup>*</sup>
        </span>
        <input
          type="text"
          name="user_nickname"
          className="form-control custom-placeholder nickname"
          placeholder="별명을 입력해주세요 / 2~15자"
          minLength={2}
          maxLength={15}
          required
        />
      </div>
      {/* 이메일 입력 */}
      <div className="input-group w-25 mb-5">
        <span className="input-group-text">이메일</span>
        <input
          type="text"
          name="user_email"
          className="form-control custom-placeholder"
          placeholder="이메일을 입력해주세요"
        />
        <span className="input-group-text">@</span>
        <select className="form-control" name="user_email_domain" required>
          <option value="gmail.com">gmail.com</option>
          <option value="naver.com">naver.com</option>
          <option value="daum.net">daum.net</option>
          <option value="nate.com">nate.com</option>
        </select>
      </div>
      <button type="submit" className="btn btn-info mb-3">
        회원가입
      </button>
      <button type="button" className="btn btn-warning">가입취소</button>
    </form>
  );
};