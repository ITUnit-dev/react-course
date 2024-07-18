import React, { useContext } from "react";
import { Link } from "react-router-dom";

import MyButton from "../button/MyButton";
import { AuthContext } from "../../../context";

function Navbar() {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  function logout() {
    setIsAuth(false);
    localStorage.removeItem("auth");
  }

  return (
    <div className="navbar">
      <div>
        <MyButton onClick={logout}>Выйти</MyButton>
      </div>
      <div className="navbar-links">
        <Link className="navbar-link" to="/about">
          О сайте
        </Link>
        <Link className="navbar-link" to="/posts">
          Посты
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
