import React, { useEffect, useState } from "react";

import "./styles/App.css";

import Navbar from "./components/UI/navbar/Navbar";
import AppRoutes from "./components/AppRoutes";
import { AuthContext } from "./context";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      setIsAuth(true);
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, isLoading }}>
      <div>
        <Navbar />
        <AppRoutes />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
