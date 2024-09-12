<<<<<<< HEAD
import '../css/section.css'

=======
>>>>>>> 2605a04 (	deleted:    public/favicon.ico)
function Section() {
  return(
    <section>
      <input type="checkbox" value="아이디" id="saveIdCheckBox" />
      <div id="autoLogin">자동 로그인</div>
      <input type="checkbox" value="비밀번호 저장" id="savePasswordCheckBox" />
      <div id="savePassword">비밀번호 저장</div>
    </section>
  )
}

export default Section;