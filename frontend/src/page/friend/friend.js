import ToolBar from "../../component/footer_toolBar/toolBar";
import "./friend.css";

export default function Friend() {
  return (
    <>
      <div className="container d-flex flex-column">
        {/* 친구 헤더 */}
        <div className="friend_header d-flex justify-content-between">
          <div>친구</div>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="친구 검색"
            />
            <span className="input-group-text" id="basic-addon2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-search"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
          </div>
        </div>

        {/* 내 프로필 */}
        <div className="my_profile">
          <div className="my_profile_img">
            <img src="http://placehold.it/20x20" alt="프로필" />
          </div>
        </div>

        {/* 생일인 친구 */}
        <div className="birthday_friend">
          생일인 친구
        </div>

        {/* 친구 목록 */}
        <div className="friend">
          친구
        </div>
      </div>
      <ToolBar />
    </>
  );
}
