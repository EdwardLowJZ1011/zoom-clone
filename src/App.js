import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./screens/HomePage";
import JoiningRoom from "./screens/JoiningRoom/JoiningRoom";
import RoomPage from "./screens/RoomPage/RoomPage";

function App() {
  return (
    <Router>
      <Routes>/
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/join-room" element={<JoiningRoom />}></Route>
        <Route path="/room" element={<RoomPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
