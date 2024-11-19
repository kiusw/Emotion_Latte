import { Link } from 'react-router-dom'
import "./header.css";

export default function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand">EmotionLatte</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#hamburger_button">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="hamburger_button">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* nav-item 1 */}
              <li className="nav-item">
                <Link to="/"><a className="nav-link active">Home</a></Link>
              </li>
              {/* nav-item 2 */}
              <li className="nav-item">
                <Link to="/board"><a className="nav-link">게시판</a></Link>
              </li>
              {/* nav-item 3 */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">설정</a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item">1</a></li>
                  <li><a className="dropdown-item">2</a></li>
                  <li><a className="dropdown-item">3</a></li>
                </ul>
              </li>
              {/* nav-item 4 */}
              <li className="nav-item">
                <a className="nav-link">회원가입</a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                <img src="/asset/searchicon.png" className="search_icon"/>
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}