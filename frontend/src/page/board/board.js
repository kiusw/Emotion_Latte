import { Link } from 'react-router-dom';
import './board.css';

export default function Board() {
  return (
    <>
    <div className="d-flex justify-content-center align-items-center mt-4">
      <form action="/board/board_db" method="POST" className='form-container'>

        {/*제목 입력*/}
        <div className="form-group d-flex flex-column align-items-start mb-3">
        <label>제목</label>
        <input 
          type="text" 
          name="title" 
          className='form-control'
          placeholder="제목을 입력하세요."
        />
        </div>

        {/*게시글 내용 입력*/}
        <div className="form-group d-flex flex-column align-items-start mb-3">
        <label>게시글</label>
        <textarea 
          name="content" 
          className="form-control content-textarea" 
          rows="25"
          placeholder="게시글 내용을 입력하세요."
        ></textarea>
        </div>

        {/*등록*/}
        <div className="d-flex justify-content-center gap-3">
        <button type="submit" class="btn btn-dark">등록</button>
        <Link to='/'><button type="button" class="btn btn-outline-dark">글쓰기 취소</button></Link>
        </div>
      </form>
    </div>
    </>
  );
};