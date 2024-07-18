import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import PostItem from "./PostItem";

function PostList({ title, posts, remove }) {
  if (!posts.length) {
    return <h1 style={{ textAlign: "center" }}>Посты не найдены.</h1>;
  }
  return (
    <div className="post-list-container">
      <h1 className="post-list-title">{title}</h1>
      <TransitionGroup>
        {posts.map((post, index) => (
          <CSSTransition key={post.id} timeout={500} classNames="post">
            <PostItem post={post} number={index + 1} remove={remove} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}

export default PostList;
