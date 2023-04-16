import React, { useState } from "react";
import "../css/LoginScreen.css";
import SignUpScreen from "./SignUpScreen";

const LoginScreen = () => {
  const [signIn, setSignIn] = useState(false);
  return (
    <div className="LS">
      <div className="LS__bg">
        <img
          className="LS__logo"
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt=""
        />
        <button className="BTLS" onClick={() => setSignIn(true)}>
          Sing In
        </button>
        <div className="LS__gradient"></div>
        <div className="LS__body">
          {signIn ? (
            <SignUpScreen />
          ) : (
            <>
              <h1>Unlimitted films, TV programmes and more.</h1>
              <h2>Watch anywhere. Cancel at any time</h2>
              <h3>
                Ready to watch? Enter your email to create or restart your
                membership
              </h3>
              <div className="LS__Input">
                <form action="">
                  <input type="email" placeholder="Email Address" />
                  <button onClick={() => setSignIn(true)} className="LS__Start">
                    GET STARTED
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
