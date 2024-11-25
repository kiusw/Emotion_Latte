import React, { useEffect, useState } from "react";
import ToolBar from "../../component/footer_toolBar/toolBar";
import "./friend.css";

export default function Friend() {
  return (
    <>
      <div className="container d-flex flex-column a1">
        {/* 친구 헤더 */}
        <div
          className="friend_header d-flex justify-content-between 
        align-items-center p-3 bg-light border-bottom"
        >
          <div>친구</div>
          <div className="input-group search_friend">
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
        <div className="d-flex align-items-center p-3 bg-white border-bottom my_profile">
          <div className="rounded-circle bg-secondary my_profile_img">
            <img
              src="/asset/male1.png"
              alt="프로필"
              className="img1"
            />
          </div>
          <div className="ms-3">
            <h6 className="m-0">내 이름</h6>
            <small className="text-muted">상태 메시지</small>
          </div>
        </div>

        {/* 생일인 친구 */}
        <div className="birthday_friend">
          <h6 className="text-muted">🎂 생일인 친구</h6>
          <div className="d-flex align-items-center bg-light p-2 rounded mb-2">
            <div className="rounded-circle bg-secondary birthday">
              <img src="/asset/female1.png" alt="프로필" className="img2" />
            </div>
            <span className="ms-3">생일인 친구 이름</span>
          </div>
        </div>

        {/* 친구 목록 */}
        <div className="friend">
          <h6 className="text-muted">친구 목록</h6>
          <div className="d-flex align-items-center bg-light p-2 rounded mb-2">
            <div className="rounded-circle friend-img"></div>
            <span className="ms-3">친구 이름</span>
          </div>
        </div>
      </div>
      <ToolBar />
    </>
  );
}