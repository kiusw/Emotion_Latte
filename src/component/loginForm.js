<<<<<<< HEAD
import '../css/loginForm.css'

function LoginForm() {
  return(
    <form id="loginForm">
      <h1 id="loginText">로그인</h1>
      <input type="text" placeholder="아이디를 입력해주세요" id="inputId" />
      <input type="password" placeholder="비밀번호를 입력해주세요" id="inputPassword" />
      <button id="loginButton">로그인</button>
    </form>
=======
function LoginForm() {
  return(
    <loginForm>
      <input type="text" placeholder="아이디를 입력해주세요" id="inputId" />
      <input type="password" placeholder="비밀번호를 입력해주세요" id="inputPassword" />
      <button id="loginButton">로그인</button>
    </loginForm>
>>>>>>> 2605a04 (	deleted:    public/favicon.ico)
  )
};

export default LoginForm;