import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useFetching } from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/Loader";

function PostIdPage() {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [fetchPostById, isLoading, error] = useFetching(async () => {
    const response = await PostService.getById(params.id);
    setPost(response.data);
  });
  const [fetchComments, isCommentsLoading, commentsError] = useFetching(
    async () => {
      const response = await PostService.getCommentsByPostId(params.id);
      setComments(response.data);
    }
  );

  useEffect(() => {
    fetchPostById();
    fetchComments();
  }, []);

  return (
    <div>
      <h1>Вы открыли страницу поста c id = {params.id}.</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {post.id} {post.title}
        </div>
      )}
      <h2>Комментарии к посту.</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {comments.map((comment) => (
            <div key={comment.id} style={{ marginTop: "15px" }}>
              <h3>{comment.email}</h3>
              <div>{comment.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostIdPage;
