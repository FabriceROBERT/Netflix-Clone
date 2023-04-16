import React from "react";
import "./App.css";
import HomeScreen from "./pages/HomeScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "./pages/LoginScreen";

function App() {
  const user = null;
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          {!user ? (
            <Route path="/" element={<LoginScreen />} />
          ) : (
            <Route path="/" element={<HomeScreen />} />
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
