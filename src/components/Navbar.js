import React, { useState, useEffect } from "react";
import "../css/Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [show, handleShow] = useState(false);
  const history = useNavigate();

  const transitionNavbar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", transitionNavbar);
    return () => window.removeEventListener("scroll", transitionNavbar);
  }, []);
  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__contents">
        <img
          onClick={() => history("/")}
          className="nav__logo"
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt=""
        />
        <img
          // Redire vers la page
          onClick={() => history("/profile")}
          className="nav__avatar"
          src="https://ih1.redbubble.net/image.618427277.3222/flat,400x400,075,f.u2.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default Navbar;
