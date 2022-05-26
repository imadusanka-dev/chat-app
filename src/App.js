import React from "react";
import Chat from "./components/Chat";
import SideBar from "./components/SideBar";
import Login from "./components/Login";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useStateValue } from "./context/stateProvider";

function App() {
  const [{ user }] = useStateValue();

  return (
    <div className="app">
      <div className="app__body">
        {user ? (
          <Router>
            <SideBar />
            <Routes>
              <Route path="/room/:roomId" element={<Chat />} />
              <Route path="/" element={<Chat />} />
            </Routes>
          </Router>
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
}

export default App;
