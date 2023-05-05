import React, { useEffect } from "react";
import "./App.css";
import HomeScreen from "./pages/HomeScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "./pages/LoginScreen";
import { auth } from "./Firebase";
import ProfileScreen from "./pages/ProfileScreen";
import "./features/counter/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/counter/userSlice";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // Logged in
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        // Logged out
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          {!user ? (
            <Route path="/" element={<LoginScreen />} />
          ) : (
            <>
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/" element={<HomeScreen />} />
            </>
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
