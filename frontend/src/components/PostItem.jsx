import React from "react";
import MyButton from "./UI/button/MyButton";
import { useNavigate } from "react-router-dom";

function PostItem({ post, number, remove }) {
  const navigate = useNavigate();
  return (
    <div className="post-item-container">
      <h2 className="post-item-title">
        {post.id}. {post.title}
      </h2>
      <div className="post-item-body">{post.body}</div>
      <div className="post-item-buttons">
        <MyButton onClick={() => navigate(`/posts/${post.id}`)}>
          Открыть
        </MyButton>
        <MyButton onClick={() => remove(post)}>Удалить пост</MyButton>
      </div>
    </div>
  );
}

export default PostItem;
