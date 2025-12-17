import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Jobs from "./components/Jobs";
import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({});

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={token ? <Jobs token={token} user={user} /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
