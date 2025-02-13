import React, { useEffect, useRef, useState } from "react";

import "../styles/App.css";

import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/modal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import Loader from "../components/UI/loader/Loader";

import { usePosts } from "../hooks/usePosts";

import PostService from "../API/PostService";
import { useFetching } from "../hooks/useFetching";
import { getPagesCount } from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";
import { useObserver } from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const lastElement = useRef();
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPagesCount(totalCount, limit));
  });

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  });

  function createPost(newPost) {
    setPosts([...posts, newPost]);
    setModal(false);
  }
  function removePost(post) {
    setPosts(posts.filter((p) => p.id !== post.id));
  }
  function changePage(page) {
    setPage(page);
  }

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  return (
    <div className="App">
      <div className="App-header">
        <MyButton style={{ marginTop: "15px" }} onClick={() => setModal(true)}>
          Создать пост
        </MyButton>
        <MyModal visible={modal} setVisible={setModal}>
          <PostForm create={createPost} />
        </MyModal>
        <hr style={{ margin: "15px" }} />
        <PostFilter filter={filter} setFilter={setFilter} />
        <MySelect
          value={limit}
          onChange={(value) => setLimit(value)}
          defaultValue="Кол-во элементов на странице"
          options={[
            { value: 5, name: "5" },
            { value: 10, name: "10" },
            { value: 25, name: "25" },
            { value: -1, name: "Показать все" },
          ]}
        />
      </div>
      {postError && <h1>Произошла ошибка: {postError}</h1>}
      <PostList
        remove={removePost}
        title={"Список постов"}
        posts={sortedAndSearchedPosts}
      />
      {isPostsLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <Loader />
        </div>
      )}
      <div
        ref={lastElement}
        style={{ height: "20px", background: "red" }}
      ></div>
      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  );
}

export default Posts;
