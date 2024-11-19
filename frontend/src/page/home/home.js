import { Link } from "react-router-dom";
import Auto_slider from "../../component/auto_slider/auto_slider";
import "./home.css";
import "animate.css";

export default function Home() {
  return (
    <>
      <div className="home_image_container1 animate__animated animate__bounceInLeft">
        <img
          src="/asset/home_image.png"
        />
      </div>
      <div className="home_image_container2 animate__animated animate__bounceInDown">
        <Auto_slider />
      </div>
      <Link to="/login">
        <button
          type="button"
          className="btn go_to_login btn-lg animate__animated animate__bounceInRight"
        >
          로그인
        </button>
      </Link>
      <Link to="/sign_up">
        <button
          type="button"
          className="btn go_to_sign_up btn-lg animate__animated animate__bounceInRight"
        >
          회원가입
        </button>
      </Link>
    </>
  );
}
