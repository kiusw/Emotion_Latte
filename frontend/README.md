import React, { useState } from 'react';
import Post from './post.js';

function Board() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');

  const addPost = () => {
    if (content.trim()) {
      const newPost = { id: Date.now(), content };
      setPosts([newPost, ...posts]);
      setContent('');
    }
  };

  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  return (

    <div>
      <h2>게시판</h2>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="글을 입력하세요"
      />
      <button onClick={addPost}>작성</button>
      <div>
        {posts.length > 0 ? (
          posts.map(post => (
            <Post key={post.id} post={post} onDelete={deletePost} />
          ))
        ) : (
          <p>글이 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default Board;

--

function Post({ post, onDelete }) {
  return (
    <div className="post">
      <p>{post.content}</p>
      <button onClick={() => onDelete(post.id)}>삭제</button>
    </div>
  );
}

export default Post;

          <Route path="/board" element={<Board />} />