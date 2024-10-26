import React, { useState } from 'react';

const Feedback = ({ articleId }) => {
  const [likes, setLikes] = useState(0);
  const [comment, setComment] = useState('');

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기서 API 호출을 통해 피드백을 서버에 저장할 수 있습니다.
    console.log(`Feedback for article ${articleId}: ${comment}`);
    setComment(''); // 제출 후 입력 필드 초기화
  };

  return (
    <div className="feedback">
      <button onClick={handleLike}>👍 {likes}</button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={comment}
          onChange={handleCommentChange}
          placeholder="메모를 남겨보세요"
        />
        <button type="submit">저장</button>
      </form>
    </div>
  );
};

export default Feedback;
