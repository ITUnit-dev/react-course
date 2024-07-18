import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Error from "../pages/Error";
import { privateRoutes, publicRoutes } from "../router/routes";
import { AuthContext } from "../context";
import Loader from "./UI/loader/Loader";

function AppRoutes() {
  const { isAuth, setIsAuth, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loader />;
  }

  return isAuth ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
      {/* <Route path="*" element={<Error />} /> */}
      <Route path="/*" element={<Navigate to="/posts" replace />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
      {/* <Route path="*" element={<Error />} /> */}
      <Route path="/*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;
